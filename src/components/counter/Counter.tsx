import { useEffect, useState, useRef, useContext } from "react";
import { Difficulty } from "../../Types";
import styles from "./counter.module.scss";
import Swal from "sweetalert2";
import { useTodayEmoji } from "../../context";

interface Props {
  difficulty: Difficulty;
}

export default function Counter(props: Props) {
  const effectRan = useRef(false);
  const [count, setCount] = useState(0);
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

  const initGame = () => {
    setCount (() => 0)
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
      if (count < 10) {
        setCount((prevCount) => prevCount + 1);
      }
    }

    if (props.difficulty == "Normal") {
      if (count < 20) {
        setCount((prevCount) => prevCount + 1);
      }
    }

    if (props.difficulty == "Hard") {
      if (count < 30) {
        setCount((prevCount) => prevCount + 1);
      }
    }
  };

  const reduceCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const guessNumber = () => {
    // Number guessed.
    if (count === randomNumber) {
      Swal.fire({
        title: "You found the number!",
        text: "Number of tries: " + triesNumber,
        icon: "success"
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
      if (count > randomNumber) {
        setMessage(() => "Lower");
      } else {
        setMessage(() => "Higher");
      }
    }
  };


  return (
    <>
      <div className={styles.countContainer}>
        <p className={styles.userGreetings}>Found the number {useTodayEmoji()}!  </p>
        <p className={styles.userGreetings}>{props.difficulty} Dificulty</p>
        <p className={styles.count}>
          <b>
            Count: <span>{count}</span>
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
