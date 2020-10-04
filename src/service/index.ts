import { User } from '../db';
import * as auth from '../util/auth';
import { throwError } from '../util/error';

export const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user == null) {
    throwError({
      status: 400,
      message: `User with email ${email} is not found`,
    });
  }

  const isPasswordCorrect = await auth.checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    throwError({
      status: 401,
      message: `Wrong password`,
    });
  }
  const token = await auth.signToken({ email });
  return token;
};