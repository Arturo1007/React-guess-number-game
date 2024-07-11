import { useEffect, useState, useRef, useContext, useReducer } from "react";
import { Difficulty } from "../../Types";
import styles from "./counter.module.scss";
import Swal from "sweetalert2";
import { useTodayEmoji } from "../../context";

interface Props {
  difficulty: Difficulty;
}

interface CountState {
  count: number;
}

interface CountAction {
  type: "increment" | "decrement" | "reset";
}

export default function Counter(props: Props) {
  const effectRan = useRef(false);
  const [countState, countDispatch] = useReducer(countReducer, {
    count: 0,
  });
  let [randomNumber, setrandomNumber] = useState(0);
  let [triesNumber, setTriesNumber] = useState(0);
  let [message, setMessage] = useState("");

  useEffect(() => {
    if (effectRan.current === true) {
      initGame();
    }
    return () => {
      effectRan.current = true;
    };
  }, [props.difficulty]);

  // Reducer function.
  function countReducer(state: CountState, action: CountAction) {
    const { type } = action;
    switch (type) {
      case "increment": 
        return {...state, count: state.count + 1}
      case "decrement": 
        return {...state, count: state.count - 1}
      case "reset": 
        return {...state, count: 0}
      default:
        return state;
    }
  }

  const initGame = () => {
    countDispatch({ type: "reset" });
    if (props.difficulty == "Easy") {
      setrandomNumber(() => {
        return Math.floor(Math.random() * 11);
      });
    }

    if (props.difficulty == "Normal") {
      setrandomNumber(() => {
        return Math.floor(Math.random() * 21);
      });
    }

    if (props.difficulty == "Hard") {
      setrandomNumber(() => {
        return Math.floor(Math.random() * 31);
      });
    }
  };

  const increaseCount = () => {
    if (props.difficulty == "Easy") {
      if (countState.count < 10) {
        countDispatch({ type: "increment" });
      }
    }

    if (props.difficulty == "Normal") {
      if (countState.count < 20) {
        countDispatch({ type: "increment" });
      }
    }

    if (props.difficulty == "Hard") {
      if (countState.count < 30) {
        countDispatch({ type: "increment" });
      }
    }
  };

  const reduceCount = () => {
    if (countState.count > 0) {
      countDispatch({ type: "decrement" });
    }
  };

  const guessNumber = () => {
    // Number guessed.
    if (countState.count === randomNumber) {
      Swal.fire({
        title: "You found the number!",
        text: "Number of tries: " + triesNumber,
        icon: "success",
      });
      initGame();
      setMessage(() => "");
      setTriesNumber(() => 0);
    } else {
      // Number not guessed.
      setTriesNumber((prevNumber) => {
        return prevNumber + 1;
      });
      // Set message
      if (countState.count > randomNumber) {
        setMessage(() => "Lower");
      } else {
        setMessage(() => "Higher");
      }
    }
  };

  return (
    <>
      <div className={styles.countContainer}>
        <p className={styles.userGreetings}>
          Found the number {useTodayEmoji()}!{" "}
        </p>
        <p className={styles.userGreetings}>{props.difficulty} Dificulty</p>
        <p className={styles.count}>
          <b>
            Count: <span>{countState.count}</span>
          </b>
        </p>
        {triesNumber ? <p>Attempt: {triesNumber}</p> : null}
        {message && <p>{message}</p>}
        <div className={styles.buttonsContainer}>
          <button onClick={reduceCount}>-</button>
          <button onClick={increaseCount}>+</button>
          <button onClick={guessNumber}>Guess!</button>
        </div>
      </div>
    </>
  );
}
