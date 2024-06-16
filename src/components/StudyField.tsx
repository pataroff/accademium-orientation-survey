import React, { useState } from 'react';

import { getQuestions, getStudyFields, getJsonRegex } from '@/utils';

import { Progress } from './ui/progress';
import { Recommendation, Recommendations, SurveyAnswers } from '@/types';
import { useToast } from './ui/use-toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip';

const studyFieldToImage = new Map<string, string>([
  ['Language and Communication', '../../images/language-and-communication.png'],
  ['Behaviour and Society', '../../images/behaviour-and-society.png'],
  ['Business and Economics', '../../images/business-and-economics.png'],
  [
    'Exact and Information Sciences',
    '../../images/exact-and-information-sciences.png',
  ],
  ['Sports and Health', '../../images/sports-and-health.png'],
  ['Science and Engineering', '../../images/science-and-engineering.png'],
  ['Arts and Culture', '../../images/arts-and-culture.png'],
]);

const StudyField: React.FC<{
  surveyAnswers: SurveyAnswers;
  recommendations: Recommendation[];
  disabled: boolean;
  setSurveyAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers>>;
  setRecommendations: React.Dispatch<
    React.SetStateAction<Recommendations | null>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  surveyAnswers,
  recommendations,
  disabled,
  setSurveyAnswers,
  setRecommendations,
  setLoading,
  setDisabled,
}) => {
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
    setSurveyAnswers({
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
    setRecommendations(null);
  };

  const handleRandomize = () => {
    setDisabled(true);
    generateRandomRecommendations(
      recommendations,
      surveyAnswers,
      setRecommendations
    );
  };

  const generateRandomRecommendations = async (
    recommendations: Recommendation[],
    surveyAnswers: SurveyAnswers,
    setRecommendations: React.Dispatch<
      React.SetStateAction<Recommendations | null>
    >
  ) => {
    setLoading(true);

    const prompt = `Based on the previous recommendations and the answers provided in the orientation survey below, generate three additional study fields from the predefined study fields that would also be suitable for the individual. Ensure the new recommendations are unique and not already included in the previous ones.

      Orientation Survey Questions and Answers:
      1. ${getQuestions()[0]} ${surveyAnswers.careerInterests}
      2. ${getQuestions()[1]} ${surveyAnswers.workEnvironment}
      3. ${getQuestions()[2]} ${surveyAnswers.problemSolving}
      4. ${getQuestions()[3]} ${surveyAnswers.skillsDevelopment}
      5. ${getQuestions()[4]} ${surveyAnswers.taskPreference}
      6. ${getQuestions()[5]} ${surveyAnswers.learningPreference}
      7. ${getQuestions()[6]} ${surveyAnswers.careerGoals}
      8. ${getQuestions()[7]} ${surveyAnswers.careerMotivation}
      9. ${getQuestions()[8]} ${surveyAnswers.adversityHandling}
      10. ${getQuestions()[9]} ${surveyAnswers.workLifeBalance}

    Previous Recommendations: ${recommendations
      .map((recommendation) => recommendation.study_field)
      .join(', ')}
  
    Predefined Study Fields: ${getStudyFields().join(', ')}
  
    Please provide the recommendations in the following JSON format:
  
    {
        "recommendations": [
            {
                "study_field": "Field 1",
                "reason": "Reason for recommending Field 1."
            },
            {
                "study_field": "Field 2",
                "reason": "Reason for recommending Field 2."
            },
            {
                "study_field": "Field 3",
                "reason": "Reason for recommending Field 3."
            }
        ]
    }`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are an expert in education and career counseling.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-4o',
        temperature: 0.2,
        max_tokens: 1000,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );

      const json = await response.json();

      const data = json.choices[0].message.content;
      console.log('Data: ', data);
      const dataFormatted = data.replace(getJsonRegex(), '');
      console.log('Data Formatted:', dataFormatted);
      const dataParsed = JSON.parse(dataFormatted);
      console.log('Data Parsed:', dataParsed);

      setRecommendations(dataParsed);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getImage = (study_field: string) => {
    return studyFieldToImage.get(study_field);
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className='flex flex-col justify-center items-center gap-y-6 h-screen pt-[4rem] relative'>
        <button
          disabled={disabled}
          className={`absolute top-[7.5rem] right-[10.5rem] ${
            disabled ? 'opacity-25' : ''
          }`}
          onClick={() => handleRandomize()}
        >
          <img
            src='../../images/randomize-icon.png'
            width={35}
            height={35}
          ></img>
        </button>
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
        {/* Recommendations Wrapper */}
        <div className='flex flex-row gap-x-8'>
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className='flex flex-col justify-center items-center'
            >
              <button
                className={`border-2 rounded-xl w-[13.5rem] h-[16rem] hover:border-black ${
                  selected === index ? 'border-black' : ''
                } flex justify-center items-center relative`}
                onClick={() => setSelected(index)}
              >
                <Tooltip text={recommendation.reason}>
                  <img
                    className='absolute top-3 right-3'
                    src='../../images/info-icon.png'
                    width={22}
                    height={22}
                  ></img>
                </Tooltip>

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
            Next{' '}
            <FontAwesomeIcon icon={faArrowRight} className='text-sm ml-1' />
          </h3>
        </button>
      </div>
    </>
  );
};
export default StudyField;
