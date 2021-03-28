import { UserModel } from '../../users/user.model';

export const createValidUser = async () => {
  let user = await UserModel.create({
    username: 'testuser',
    email: 'test@test.com',
    password: 'test12345',
  });

  return await user.save();
};
