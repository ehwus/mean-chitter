import express from 'express';
import { UserModel } from './user.model';
import { check, validationResult } from 'express-validator';

const router = express.Router();
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('username', 'Usernames must be between 5 and 20 characters').isLength(
      {
        min: 5,
        max: 20,
      }
    ),
    check('email', 'Email address must be valid').isEmail(),
    check('password', 'Password must be between 5 and 20 characters').isLength({
      min: 5,
      max: 20,
    }),
  ],
  async (req: any, res: any) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json('Invalid details');

    await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).json('Saved');
  }
);

export default router;
