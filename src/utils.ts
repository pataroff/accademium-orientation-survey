const questionsAndAnswers = [
  [
    'What are your primary career interests?',
    'A) Business and Management',
    'B) Engineering and Technology',
    'C) Healthcare and Medicine',
    'D) Arts and Humanities',
  ],
  [
    'What is your preferred work environment?',
    'A) Fast-paced and dynamic',
    'B) Collaborative and team-oriented',
    'C) Analytical and data-driven',
    'D) Creative and innovative',
  ],
  [
    'How do you prefer to solve problems?',
    'A) Logical analysis and reasoning',
    'B) Hands-on experimentation and trial-and-error',
    'C) Strategic planning and forecasting',
    'D) Intuitive insights and creativity',
  ],
  [
    'What skills would you like to develop further?',
    'A) Leadership and management',
    'B) Technical and engineering expertise',
    'C) Communication and interpersonal skills',
    'D) Critical thinking and problem-solving abilities',
  ],
  [
    'What type of tasks do you enjoy most?',
    'A) Leading and delegating tasks',
    'B) Building and designing systems',
    'C) Helping and supporting others',
    'D) Creating and expressing ideas',
  ],
  [
    'How do you prefer to learn new concepts?',
    'A) Reading and studying independently',
    'B) Hands-on experimentation and projects',
    'C) Group discussions and collaborative projects',
    'D) Visual demonstrations and multimedia presentations',
  ],
  [
    'What are your long-term career goals?',
    'A) Climbing the corporate ladder',
    'B) Starting my own business or venture',
    'C) Making a positive impact on society',
    'D) Pursuing artistic or creative endeavors',
  ],
  [
    'What motivates you in your career?',
    'A) Financial success and stability',
    'B) Making a difference and helping others',
    'C) Solving complex problems and challenges',
    'D) Personal growth and development',
  ],
  [
    'How do you handle adversity or setbacks?',
    'A) Persevere and push through difficulties',
    'B) Seek guidance and support from others',
    'C) Analyze the situation and develop a strategic plan',
    'D) Embrace change and adapt quicky',
  ],
  [
    'What work-life balance do you prefer?',
    'A) Strive for a challenging and demanding career',
    'B) Prioritize personal and family time over work commitments',
    'C) Find a balance between work and personal life',
    'D) Integrate work and personal passions seamlessly',
  ],
];

const studyFields = [
  'Language and Communication',
  'Behaviour and Society',
  'Business and Economics',
  'Exact and Information Sciences',
  'Sports and Health',
  'Science and Engineering',
  'Arts and Culture',
];

const surveyAnswerKeys = [
  'careerInterests',
  'workEnvironment',
  'problemSolving',
  'skillsDevelopment',
  'taskPreference',
  'learningPreference',
  'careerGoals',
  'careerMotivation',
  'adversityHandling',
  'workLifeBalance',
];

const jsonRegex = /```json|```/g;

export const getQuestionsAndAnswers = () => {
  return questionsAndAnswers;
};

export const getQuestions = () => {
  return questionsAndAnswers.map((arr) => arr[0]);
};

export const getStudyFields = () => {
  return studyFields;
};

export const getJsonRegex = () => {
  return jsonRegex;
};

export const getSurveyAnswersKeys = () => {
  return surveyAnswerKeys;
};
