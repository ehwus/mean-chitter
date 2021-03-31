import { UserModel } from '../../users/user.model';

export const defaultUsername = 'testuser';
export const defaultEmail = 'test@test.com';

export const createValidUser = async () => {
  let user = await UserModel.create({
    username: defaultUsername,
    email: defaultEmail,
    password: 'test12345',
  });

  return await user.save();
};
