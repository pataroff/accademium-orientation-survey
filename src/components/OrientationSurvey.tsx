import React, { useState } from 'react';
import { getSurveyAnswersKeys } from '../utils';
import { OrientationSurveyProps, SurveyAnswers } from '../types';

const OrientationSurvey: React.FC<OrientationSurveyProps> = ({
  questionsAndAnswers,
  generateRecommendations,
}) => {
  const [questionIndex, setQuesitonIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({
    careerInterests: '',
    workEnvironment: '',
    problemSolving: '',
    skillsDevelopment: '',
    taskPreference: '',
    learningPreference: '',
    careerGoals: '',
    careerMotivation: '',
    adversityHandling: '',
    workLifeBalance: '',
  });

  const handleNext = () => {
    if (questionIndex < questionsAndAnswers.length - 1) {
      setSurveyAnswers((prev) => ({
        ...prev,
        [getSurveyAnswersKeys()[questionIndex]]:
          questionsAndAnswers[questionIndex][selected],
      }));
      setQuesitonIndex(questionIndex + 1);
    } else {
      generateRecommendations(surveyAnswers);
    }
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className='flex flex-col justify-center items-center'>
        {/* Question */}
        <h1>{questionsAndAnswers[questionIndex][0]}</h1>
        {/* Answers */}
        <div className='flex flex-col'>
          <button onClick={() => setSelected(1)}>
            {questionsAndAnswers[questionIndex][1]}
          </button>
          <button onClick={() => setSelected(2)}>
            {questionsAndAnswers[questionIndex][2]}
          </button>
          <button onClick={() => setSelected(3)}>
            {questionsAndAnswers[questionIndex][3]}
          </button>
          <button onClick={() => setSelected(4)}>
            {questionsAndAnswers[questionIndex][4]}
          </button>
        </div>
        <button onClick={handleNext}>
          {questionIndex != questionsAndAnswers.length - 1
            ? 'Next question →'
            : 'Finish Survey →'}
        </button>
      </div>
    </>
  );
};
export default OrientationSurvey;
