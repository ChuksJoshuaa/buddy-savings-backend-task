import { UserAttributes } from "../types";

export const userTransformer = (user: UserAttributes) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};
