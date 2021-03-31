import express from 'express';
import { UserModel } from '../users/user.model';
import { check, validationResult } from 'express-validator';
const router = express.Router();

// @route   POST /api/auth
// @desc    Authorise a user
// @access  PUBLIC
router.post(
  '/',
  [
    check('email', 'Must have a valid email').isEmail(),
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

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user?.checkPassword(password))
      return res.status(200).json({ token: user.getJwt() });

    return res.status(300).json({ errors: [{ msg: 'Invalid user details' }] });
  }
);

export default router;
