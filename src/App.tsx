import { FC, useState } from "react";
import "./index.scss";

type questionsType = {
  title: string;
  variants: string[];
  correct: number;
};

const questions: questionsType[] = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

const Result: FC<{ correct: number }> = ({ correct }) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из 3</h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
};

type GameProps = {
  question: questionsType;
  clickVariants: (index: number) => void;
  step: number;
  title: string;
};

const Game: FC<GameProps> = ({ step, question, clickVariants, title }) => {
  const interestСalculation: number = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${interestСalculation}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{title}</h1>
      <ul>
        {question.variants.map((text: string, index: number) => (
          <li onClick={() => clickVariants(index)} key={text}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
};

const App: FC = () => {
  const [step, setStep] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const question: questionsType = questions[step];

  const clickVariants = (index: number): void => {
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  };

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game
          step={step}
          question={question}
          clickVariants={clickVariants}
          title={question.title}
        />
      ) : (
        <Result correct={correct} />
      )}
    </div>
  );
};

export default App;