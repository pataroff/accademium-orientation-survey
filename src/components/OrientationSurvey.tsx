import React, { useState } from 'react';
import { getSurveyAnswersKeys } from '../utils';
import { OrientationSurveyProps, SurveyAnswers } from '../types';
import { Progress } from '@/components/ui/progress';
import { useToast } from './ui/use-toast';

const OrientationSurvey: React.FC<OrientationSurveyProps> = ({
  questionsAndAnswers,
  generateRecommendations,
}) => {
  const { toast } = useToast();

  const [selected, setSelected] = useState<number>(0);
  const [questionIndex, setQuesitonIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
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
    if (selected === 0) {
      toast({
        description: 'You need to select an answer in order to proceed.',
      });
      return;
    }
    if (questionIndex < questionsAndAnswers.length - 1) {
      setSurveyAnswers((prev) => ({
        ...prev,
        [getSurveyAnswersKeys()[questionIndex]]:
          questionsAndAnswers[questionIndex][selected],
      }));
      setProgress((prev) => prev + 10);
      setSelected(0);
      setQuesitonIndex(questionIndex + 1);
    } else {
      generateRecommendations(surveyAnswers);
    }
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className='flex flex-col justify-center items-center gap-y-6 h-screen pt-[4rem]'>
        <Progress value={progress} className='w-[28rem]' />
        {/* Question */}
        <h1 className='font-coolvetica text-3xl font-bold '>
          {questionsAndAnswers[questionIndex][0]}
        </h1>
        {/* Answers */}
        <div className='flex flex-col gap-y-5'>
          <button
            className={`border-2 rounded-xl w-[42rem] hover:border-black ${
              selected === 1 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(1)}
          >
            <h3 className='text-left font-coolvetica font-normal text-2xl p-2.5 pl-4'>
              {questionsAndAnswers[questionIndex][1]}
            </h3>
          </button>
          <button
            className={`border-2 rounded-xl w-[42rem] hover:border-black ${
              selected === 2 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(2)}
          >
            <h3 className='text-left font-coolvetica font-normal text-2xl p-2.5 pl-4'>
              {questionsAndAnswers[questionIndex][2]}
            </h3>
          </button>
          <button
            className={`border-2 rounded-xl w-[42rem] hover:border-black ${
              selected === 3 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(3)}
          >
            <h3 className='text-left font-coolvetica font-normal text-2xl p-2.5 pl-4'>
              {questionsAndAnswers[questionIndex][3]}
            </h3>
          </button>
          <button
            className={`border-2 rounded-xl w-[42rem] hover:border-black ${
              selected === 4 ? 'border-black' : ''
            }`}
            onClick={() => setSelected(4)}
          >
            <h3 className='text-left font-coolvetica font-normal text-2xl py-2.5 pl-4'>
              {questionsAndAnswers[questionIndex][4]}
            </h3>
          </button>
        </div>
        <button
          className='bg-black rounded-2xl w-[24rem] py-2 mt-6'
          onClick={handleNext}
        >
          <h3 className='font-coolvetica font-normal text-lg text-white'>
            {questionIndex != questionsAndAnswers.length - 1
              ? 'Next question →'
              : 'Finish Survey →'}
          </h3>
        </button>
      </div>
    </>
  );
};
export default OrientationSurvey;
