import { Router, setGoal, getGoals, updateGoal, deleteGoal, authenticate } from './goals'
const goalRouter = Router();

goalRouter.post('/api/goal', authenticate, setGoal);
goalRouter.get('/api/goals', authenticate, getGoals);
goalRouter.put('/api/goal/:id', authenticate, updateGoal);
goalRouter.delete('/api/goal/:id', authenticate, deleteGoal);

export default goalRouter;