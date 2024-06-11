import React, { useState } from 'react';
import { SurveyAnswers, Recommendations } from './types';
import {
  getQuestions,
  getQuestionsAndAnswers,
  getStudyFields,
  getJsonRegex,
} from './utils';
import OrientationSurvey from './components/OrientationSurvey';

import { Toaster } from './components/ui/toaster';
import { Loader2 } from 'lucide-react';
import StudyField from './components/StudyField';
import { Separator } from './components/ui/separator';

const App: React.FC = () => {
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateRecommendations = async (surveyAnswers: SurveyAnswers) => {
    setLoading(true);

    const prompt = `Based on the answers provided in the orientation survey below, recommend three study fields from the predefined study fields that would be the most suitable for the individual.

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

      Predefined Study Fields: ${getStudyFields().join(', ')}

      Please provide the recommendations in the following JSON format:

      {
          "recommendations": [
              {
                  "study_field": "Field 1",
                  "reason": "Reason for recommending Field 1 based on the orientation survey answers."
              },
              {
                  "study_field": "Field 2",
                  "reason": "Reason for recommending Field 2 based on the orientation survey answers."
              },
              {
                  "study_field": "Field 3",
                  "reason": "Reason for recommending Field 3 based on the orientation survey answers."
              }
          ]
      }
    `;

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
        temperature: 0.5,
        max_tokens: 1000,
      }),
    };

    // try {
    //   const response = await fetch(
    //     import.meta.env.VITE_OPENAI_API_URL,
    //     options
    //   );

    //   const json = await response.json();

    //   const data = json.choices[0].message.content;
    //   console.log('Data: ', data);
    //   const dataFormatted = data.replace(getJsonRegex(), '');
    //   console.log('Data Formatted:', dataFormatted);
    //   const dataParsed = JSON.parse(dataFormatted);
    //   console.log('Data Parsed:', dataParsed);

    //   setRecommendations(dataParsed);
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      <header>
        <img
          className='absolute -top-5'
          src='../../images/Accademium_Logo.svg'
          width={240}
        ></img>
      </header>
      <main>
        <Separator className='absolute top-28 left-32 w-[85%]' />
        {recommendations && !loading ? (
          <>
            <StudyField />
          </>
        ) : loading ? (
          <div className='flex justify-center items-center h-screen w-screen'>
            <Loader2 className='w-24 h-24 animate-spin' />
          </div>
        ) : (
          <OrientationSurvey
            questionsAndAnswers={getQuestionsAndAnswers()}
            generateRecommendations={generateRecommendations}
          />
        )}
        <Separator className='absolute bottom-8 left-32 w-[85%]' />
      </main>
      <Toaster />
    </>
  );
};

export default App;
