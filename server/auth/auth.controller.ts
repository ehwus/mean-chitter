import express from 'express';
import { UserModel } from '../users/user.model';
import { check, validationResult } from 'express-validator';
const router = express.Router();

// @route   POST /api/auth
// @desc    Authorise a user
// @access  PUBLIC
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user?.checkPassword(password))
    return res.status(200).json({ token: user.getJwt() });

  return res.status(404).json({ errors: [{ msg: 'Invalid user details' }] });
});

export default router;
