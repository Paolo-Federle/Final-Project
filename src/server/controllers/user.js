const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const jwtSecret = 'mysecret';

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
  res.json({ data: { id: createdUser.id, username: createdUser.username } });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await prisma.user.findUnique({
      where: { username },
    })
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordsMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }
    const token = jwt.sign({ username, id: foundUser.id }, jwtSecret);
    res.json({ data: token });
};

