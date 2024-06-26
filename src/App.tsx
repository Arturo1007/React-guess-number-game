import "./App.scss";
import Counter from "./components/counter/Counter";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { Difficulty } from "./Types";
import { TodayEmoji, useTodayEmoji } from "./context";


function App() {
  const effectRan = useRef(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("Normal");
  function fireAlert() {
    Swal.fire({
      title: "Select Difficulty",
      input: "select",
      inputOptions: {
        Easy: "Easy",
        Normal: "Normal",
        Hard: "Hard",
      },
      allowOutsideClick: false,
    }).then(function (result) {
      if (result.isConfirmed) {
        setDifficulty(result.value);
      }
    });
  }

  useEffect(() => {
    if (effectRan.current === false) {
      fireAlert();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  let inputRef = useRef(null);
  return (
    <>
      <header></header>
      <main className="container">
        <TodayEmoji.Provider value={'😂'}>
          <Counter difficulty={difficulty}></Counter>
        </TodayEmoji.Provider>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
