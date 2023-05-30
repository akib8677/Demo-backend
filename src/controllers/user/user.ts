import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.model';
import { registerUser, loginUser, getMe } from './user.controller';
import { authenticate } from '../../middleware/authenticate';

export {
    Request,
    Response,
    User,
    bcrypt,
    jwt,
    authenticate,
    registerUser,
    loginUser,
    getMe
}