import express from 'express';
import { UserModel } from './user.model';
import { check, validationResult } from 'express-validator';

const router = express.Router();
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', async (req, res) => {
  res.status(400).send();
});

// router.post(
//   '/',
//   [
//     check('username', 'Usernames must be between 5 and 20 characters').isLength(
//       {
//         min: 5,
//         max: 20,
//       }
//     ),
//     check('email', 'Email address must be valid').isEmail(),
//     check('password', 'Password must be between 5 and 20 characters').isLength({
//       min: 5,
//       max: 20,
//     }),
//   ],
//   async (req: Request, res: Response) => {
//     return res.status(400);
//   }
// );

export default router;
