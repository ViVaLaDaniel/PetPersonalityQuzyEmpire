export type Quiz = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  viral_score: number;
  questions?: Question[];
  results?: QuizResult[];
};

export type Question = {
  id: string;
  quiz_id: string;
  text: string;
  image_url: string | null;
  order_index: number;
  options: Option[];
};

export type Option = {
  id: string;
  question_id: string;
  text: string;
  scores: Record<string, number>; // personality_type -> weight
};

export type QuizResult = {
  id: string;
  quiz_id: string;
  title: string;
  description: string;
  image_url: string;
  personality_type: string;
};

export type QuizSubmission = {
  id: string;
  quiz_id: string;
  result_id: string;
  shared: boolean;
  created_at: string;
};
