import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

//各種部品をインポート
import QuestionCard from './components/QuestionCard'

//クイズのタイプをインポート
import { QuestionsState, Difficulty } from './API';

//Stylesをインポート
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

//全クイズ数は10個
const TOTAL_Question = 10;

//React処理の中心
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions ] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  //quiz開始
  const startTrivia = async () => {
    //初期化
    setLoading(true);
    setGameOver(false);

    //クイズ取得
    const newQuestions = await fetchQuizQuestions(
      TOTAL_Question,
      Difficulty.EASY
    )

    //set
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

　//解答確認
  const checkAnswer = (e:any) => {
    if (!gameOver) {
      //ユーザーの答え
      const answer = e.currentTarget.valu;
      //あっているかどうか確認
      const correct = questions[number].correct_answer === answer;
      //あっていたらスコアを更新
      if (correct) setScore((prev) => prev +1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  //次の質問へ
  const nextQuestion = () => {
    //netxtQの数がTOTAL_QUESTIONSを下回る場合は次の問題へ
    const nextQ = number + 1;

    if (nextQ === TOTAL_Question) {
      setGameOver(true)
    } else {
      setNumber(nextQ)
    }
  }

  //AppのリターンとしてHTML情報を返す
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_Question ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_Question}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_Question - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  )
}

export default App;
