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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    let newUser;

    try {
      newUser = await UserModel.create({
        username,
        email,
        password,
      });
    } catch (error) {
      return res.status(400).json();
    }

    return res.status(200).json({ token: newUser.getJwt() });
  }
);

export default router;
