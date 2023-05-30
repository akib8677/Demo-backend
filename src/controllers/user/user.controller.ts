import { Request, Response, User, bcrypt, jwt } from "./user";

export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("Invalid credentials!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exisits!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      _id: user.id,
    },
    process.env.SECRET_TOKEN || "",
    { expiresIn: "31h" }
  );

  if (user) {
    res.status(201).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).send("Invalid user data!");
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Invalid credentials!");
  }

  const user = await User.findOne({ email });

  const token = jwt.sign(
    {
      _id: user.id,
    },
    process.env.SECRET_TOKEN || "",
    { expiresIn: "31h" }
  );

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).send({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).send("Invalid credentials!");
  }
}

export async function getMe(req: any, res: Response) {
  res.status(200).send(req.user);
}
