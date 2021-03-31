import { UserModel } from '../../users/user.model';

export const defaultUsername = 'testuser';
export const defaultEmail = 'test@test.com';
export const defaultPassword = 'test12345';

export const createValidUser = async () => {
  let user = await UserModel.create({
    username: defaultUsername,
    email: defaultEmail,
    password: defaultPassword,
  });

  return await user.save();
};
