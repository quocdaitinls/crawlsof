export interface StackOverflowComment {
  id: string;
  value: string;
  date: Date;
}

export interface StackOverflowPost {
  id: string;
  content: string;
  comments: StackOverflowComment[];
}

export interface StackOverflowQuestion extends StackOverflowPost {
  tags: string[];
}

export type SOF = {
  title: string;
  question: StackOverflowQuestion;
  answers: StackOverflowPost[];
};
