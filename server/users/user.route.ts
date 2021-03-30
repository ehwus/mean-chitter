import express from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
