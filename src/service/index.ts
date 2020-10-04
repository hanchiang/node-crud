import { User, Country } from '../db';
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
  const accessToken = await auth.signAccessToken({ email });
  const refreshToken = await auth.signRefreshToken({ email });
  return {
    accessToken,
    refreshToken,
  };
};

export const getAllCountries = async () => {
  const countries = await Country.findAll({});
  return countries;
};

export const getCountry = async (name) => {
  const country = await Country.findOne({
    where: {
      name,
    },
  });
  return country;
};

export const refreshToken = async (refreshToken) => {
  try {
    const decoded: any = await auth.verifyToken(refreshToken);
    const newAccessToken = await auth.signAccessToken({ email: decoded.email });
    const newRefreshToken = await auth.signRefreshToken({
      email: decoded.email,
    });
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (e) {
    throwError({
      status: 401,
      message: e.message,
    });
  }
};
