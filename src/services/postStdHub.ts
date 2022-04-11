import axios from "axios";
import {
  PostStdHubAnswer,
  PostStdHubQuestion,
  PostStdHubQuestionComment,
} from "../types/stdhub";
import {SOFConverter} from "./converter";

const post = async (url: string, userToken: string, data: any) => {
  const result = await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        ContentType: "application/json",
      },
      timeout: 30000,
    })
    .then((result) => result.data)
    .catch((err) => {
      console.log(err);
      return null;
    });

  return result;
};

export const postQuestion = (userToken: string, data: PostStdHubQuestion) => {
  return post(
    "https://studenthub-backend-development.up.railway.app/api/questions",
    userToken,
    data
  );
};

export const postQuestionComment = (
  userToken: string,
  data: PostStdHubQuestionComment
) => {
  return post(
    "https://studenthub-backend-development.up.railway.app/api/questions/comments",
    userToken,
    data
  );
};

export const postAnswer = (userToken: string, data: PostStdHubAnswer) => {
  return post(
    "https://studenthub-backend-development.up.railway.app/api/answers",
    userToken,
    data
  );
};

export const postAll = async (
  SOFConverter: SOFConverter,
  userId: string,
  userToken: string
) => {
  const question = await postQuestion(userToken, SOFConverter.question(userId));

  const promisePostQuestionComments = () =>
    Promise.all(
      SOFConverter.questionComments(userId, question.id).map((quesCmt) =>
        postQuestionComment(userToken, quesCmt)
      )
    );

  const promisePostAnswers = () =>
    Promise.all(
      SOFConverter.answers(userId, question.id).map((ans) =>
        postAnswer(userToken, ans)
      )
    );

  const [questionComments, answers] = await Promise.all([
    promisePostQuestionComments(),
    promisePostAnswers(),
  ]);

  return [question, questionComments, answers];
};
