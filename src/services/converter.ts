import {SOF, StackOverflowComment, StackOverflowPost} from "../types/sof";
import {
  PostStdHubAnswer,
  PostStdHubQuestion,
  PostStdHubQuestionComment,
} from "../types/stdhub";

const buildPostStdHubQuestion = (
  SOF: SOF,
  userId: string
): PostStdHubQuestion => {
  const {title, question} = SOF;
  const {content, tags} = question;

  return {userId, title, content, tags};
};

const buildPostStdHubQuestionComment = (
  cmt: StackOverflowComment,
  userId: string,
  questionId: string
): PostStdHubQuestionComment => {
  const {value} = cmt;

  return {userId, questionId, content: value};
};

const buildPostStdHubAnswer = (
  ans: StackOverflowPost,
  userId: string,
  questionId: string
): PostStdHubAnswer => {
  const {content} = ans;
  return {userId, questionId, content};
};

export const buildSOFConverter = (SOF: SOF) => {
  const questionComments = SOF.question.comments;
  const answers = SOF.answers;

  return {
    question: (userId: string) => buildPostStdHubQuestion(SOF, userId),
    questionComments: (userId: string, questionId: string) =>
      questionComments.map((questionComment) =>
        buildPostStdHubQuestionComment(questionComment, userId, questionId)
      ),
    answers: (userId: string, questionId: string) =>
      answers.map((answer) =>
        buildPostStdHubAnswer(answer, userId, questionId)
      ),
  };
};

export type SOFConverter = ReturnType<typeof buildSOFConverter>;
