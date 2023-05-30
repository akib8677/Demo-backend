import { Request, Response, Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import Goal from '../../models/goals.model';
import  User  from '../../models/user.model';
import { setGoal, getGoals, updateGoal, deleteGoal } from './goals.controllers';

export {
    Router,
    Request,
    Response,
    Goal,
    User,
    authenticate,
    setGoal,
    getGoals,
    updateGoal,
    deleteGoal
}
