export interface Recommendation {
  study_field: string;
  reason: string;
}

export interface Recommendations {
  recommendations: Recommendation[];
}

export interface SurveyAnswers {
  careerInterests: string;
  workEnvironment: string;
  problemSolving: string;
  skillsDevelopment: string;
  taskPreference: string;
  learningPreference: string;
  careerGoals: string;
  careerMotivation: string;
  adversityHandling: string;
  workLifeBalance: string;
}

export interface OrientationSurveyProps {
  questionsAndAnswers: string[][];
  generateRecommendations: (surveyAnswers: SurveyAnswers) => void;
  surveyAnswers: SurveyAnswers;
  setSurveyAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers>>;
}
