import React from 'react'

import { AnswerObject } from '../App'

// import { Wrapper, ButtonWrapper } from './QuestionCard.styles'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined,
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => (
    <div>test</div>
)