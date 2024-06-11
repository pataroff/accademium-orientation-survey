import React, { useState } from 'react';

import { Progress } from './ui/progress';
import { Recommendation, Recommendations } from '@/types';
import { useToast } from './ui/use-toast';

const StudyField: React.FC<{
  recommendations: Recommendation[];
  setRecommendations: React.Dispatch<
    React.SetStateAction<Recommendations | null>
  >;
}> = ({ recommendations, setRecommendations }) => {
  const { toast } = useToast();

  const [selected, setSelected] = useState<number>(-1);
  //@ts-ignore
  const [progress, setProgress] = useState<number>(0);

  const handleNext = () => {
    toast({
      description:
        'Unfortunately, at this moment, you cannot proceed any further.',
    });
  };

  const handleRetry = () => {
    setRecommendations(null);
  };

  const getImage = (study_field: string) => {
    if (study_field === 'Business and Economics') {
      return '../../images/business-and-economics.png';
    }

    if (study_field === 'Exact and Information Sciences') {
      return '../../images/exact-and-information-sciences.png';
    }

    if (study_field === 'Science and Engineering') {
      return '../../images/science-and-engineering.png';
    }
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className='flex flex-col justify-center items-center gap-y-6 h-screen pt-[4rem] relative'>
        <button
          className='absolute top-[7.5rem] right-[7.5rem]'
          onClick={() => handleRetry()}
        >
          <img src='../../images/retry-icon.png' width={35} height={35}></img>
        </button>
        <Progress
          value={progress}
          className='absolute top-[7.5rem] w-[28rem] h-[20px]'
        />
        <pre className='font-coolvetica text-3xl mt-8 font-bold'>
          The study fields that align the best {'\n'} with your interests and
          strengths
        </pre>
        <div className='flex flex-row gap-x-8'>
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className='flex flex-col justify-center items-center'
            >
              <button
                className={`border-2 rounded-xl w-[14rem] h-[16rem] hover:border-black ${
                  selected === index ? 'border-black' : ''
                } flex justify-center items-center relative`}
                onClick={() => setSelected(index)}
              >
                <img
                  className='absolute top-3 right-3'
                  src='../../images/info-icon.png'
                  width={22}
                  height={22}
                ></img>
                <img
                  src={getImage(recommendation.study_field)}
                  width={150}
                  height={150}
                ></img>
              </button>
              <h3 className='font-coolvetica font-normal text-lg'>
                {recommendation.study_field}
              </h3>
            </div>
          ))}
        </div>
        <button
          className='bg-black rounded-2xl w-[20rem] h-[2.25rem] mt-6'
          onClick={() => handleNext()}
        >
          <h3 className='font-coolvetica font-normal text-md text-white'>
            Next →
          </h3>
        </button>
      </div>
    </>
  );
};
export default StudyField;
