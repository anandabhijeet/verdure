import React, { useEffect, useState } from "react";
import { questions } from "@/constant/question";
import Modal from "../Modal";
import useQuestionsModal from "@/hooks/useQuestionsModal";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";

interface scoreType {
  id: string;
  anxiety_score: number;
  depression_score: number;
  stress_score: number;
}

const QuestionsModal = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [anxietyScore, setAnxietyScore] = useState(0);
  const [depressionScore, setDepressionScore] = useState(0);
  const [stressScore, setStressScore] = useState(0);
  const [score, setScore] = useState(0);
  const questionModal = useQuestionsModal();
  const { data: currentUser } = useCurrentUser();

  const submitAnswer = (points: number) => {
    setIsLoading(true);
    setScore(score + points);

    if (questionNumber >=0 && questionNumber<=6) {
      setAnxietyScore(anxietyScore+points);
      console.log('anxiety_score',anxietyScore)
    }

    if (questionNumber>=7 && questionNumber <= 13) {
      setDepressionScore(depressionScore + points);
    }

    if (questionNumber >=14 && questionNumber <=20) {
      setStressScore(stressScore + points);
    }

    if (questionNumber < questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
    }
    if (questionNumber === questions.length - 1) {
      setScoreApi({
        id: currentUser?.id,
        anxiety_score: anxietyScore,
        depression_score: depressionScore,
        stress_score: stressScore,
      });
      questionModal.onClose();
    }
    setIsLoading(false);
  };

  const setScoreApi = (data: scoreType) => {
    axios
      .patch("/api/setscore", data)
      .then((response) => {localStorage.setItem('user', JSON.stringify(response.data)); console.log(response)})

      .catch((error) => console.log(error));
  };

  const body = (
    <>
      <h4 style={{ color: "#fff" }}>{questions[questionNumber].questions}</h4>
      <div className="options mt-2">
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            submitAnswer(questions[questionNumber].options.b.point)
          }
        >
          <p style={{ color: "#fff" }}>
            <span style={{ color: "#fff" }}>a. </span>
            {questions[questionNumber].options.a.answer}
          </p>
        </div>

        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            submitAnswer(questions[questionNumber].options.b.point)
          }
        >
          <p style={{ color: "#fff" }}>
            <span style={{ color: "#fff" }}>b. </span>
            {questions[questionNumber].options.b.answer}
          </p>
        </div>

        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            submitAnswer(questions[questionNumber].options.b.point)
          }
        >
          <p style={{ color: "#fff" }}>
            <span style={{ color: "#fff" }}>c. </span>
            {questions[questionNumber].options.c.answer}
          </p>
        </div>

        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            submitAnswer(questions[questionNumber].options.d.point)
          }
        >
          <p style={{ color: "#fff" }}>
            <span style={{ color: "#fff" }}>d. </span>
            {questions[0].options.d.answer}
          </p>
        </div>
      </div>
    </>
  );

  const footer = (
    <>
      {questionNumber <= questions.length ? (
        <p style={{ color: "#bbbbbb" }}>
          {questionNumber + 1}/{questions.length}
        </p>
      ) : (
        <div>
          <p style={{ color: "#bbbbbb" }}>Almost Done</p>
        </div>
      )}
    </>
  );
  return (
    <>
      <Modal
        isOpen={questionModal.isOpen}
        onClose={questionModal.onClose}
        title="Question"
        disabled={isLoading}
        body={body}
        footer={footer}
        actionLabel="diagnosis"
        onSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default QuestionsModal;
