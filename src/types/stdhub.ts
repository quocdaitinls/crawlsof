export type PostStdHubQuestion = {
  userId: string;
  title: string;
  content: string;
  tags: string[];
};

export type PostStdHubQuestionComment = {
  userId: string;
  questionId: string;
  content: string;
};

export type PostStdHubAnswer = {
  userId: string;
  questionId: string;
  content: string;
};
