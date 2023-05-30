import { Request, Response, Goal, User } from "./goals";

export async function setGoal(req: any, res: Response) {
  try {
    if (!req.body.text) {
      res.status(400).send({ message: "Goal is not found" });
    }

    const goal = await Goal.create({
      text: req.body.text,
      user: req.user._id,
    });

    res.status(200).send(goal);
  } catch (error) {
    console.log(error);
  }
}

export async function getGoals(req: any, res: Response) {
  try {
    console.log(req.user._id);
    const goal = await Goal.find({ user: req.user._id });

    res.status(200).send(goal);
  } catch (error) {
    console.log(error);
  }
}

export async function updateGoal(req: any, res: Response) {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!req.user) {
      res.status(401).send("User not found");
    }

    if (goal.user.toString() !== req.user._id) {
      res.status(401).send("User not authorized");
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).send(updateGoal);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteGoal(req: any, res: Response) {
  try {
    const goal = await Goal.findById(req.params.id);
    // const user = await User.findById(req.user._id);

    if (!req.user) {
      res.status(401).send("User not found");
    }

    if (goal.user.toString() !== req.user._id) {
      res.status(401).send("User not authorized");
    }
    await goal.remove();
    res.status(200).send({ id: req.params.id });
  } catch (error) {
    console.log(error);
  }
}
