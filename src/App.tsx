import React, { useState } from 'react';
import { SurveyAnswers, Recommendations } from './types';
import {
  getQuestions,
  getQuestionsAndAnswers,
  getStudyFields,
  getJsonRegex,
} from './utils';

import OrientationSurvey from './components/OrientationSurvey';
import StudyField from './components/StudyField';

import { Toaster } from './components/ui/toaster';
import { Separator } from './components/ui/separator';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);
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
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>({
      recommendations: [
        {
          study_field: 'Business and Economics',
          reason:
            'Given your primary career interest in Business and Management, your long-term goal of starting your own business, and your motivation to solve complex problems, a study in Business and Economics aligns well with your aspirations and interests.',
        },
        {
          study_field: 'Science and Engineering',
          reason:
            'Your preference for a creative and innovative work environment, enjoyment of building and designing systems, and hands-on experimentation indicate that Science and Engineering would be a suitable field for you. This field will also help you develop critical thinking and problem-solving abilities.',
        },
        {
          study_field: 'Exact and Information Sciences',
          reason:
            'Your interest in solving complex problems, preference for hands-on learning, and desire to build and design systems suggest that Exact and Information Sciences would be a good fit. This field will provide you with the technical skills and knowledge needed to innovate and potentially start your own tech-related business.',
        },
      ],
    });

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
        <Separator className='absolute top-24 left-32 w-[85%]' />
        {recommendations && !loading ? (
          <>
            <StudyField
              surveyAnswers={surveyAnswers}
              recommendations={recommendations.recommendations}
              disabled={disabled}
              setSurveyAnswers={setSurveyAnswers}
              setRecommendations={setRecommendations}
              setLoading={setLoading}
              setDisabled={setDisabled}
            />
          </>
        ) : loading ? (
          <div className='flex justify-center items-center h-screen w-screen'>
            <Loader2 className='w-24 h-24 animate-spin' />
          </div>
        ) : (
          <OrientationSurvey
            questionsAndAnswers={getQuestionsAndAnswers()}
            generateRecommendations={generateRecommendations}
            surveyAnswers={surveyAnswers}
            setSurveyAnswers={setSurveyAnswers}
          />
        )}
        <Separator className='absolute bottom-10 left-32 w-[85%]' />
      </main>
      <Toaster />
    </>
  );
};

export default App;
