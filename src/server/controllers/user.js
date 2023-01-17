const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendDataResponse, sendMessageResponse } = require('../utils/responses.js')
const {
  getAllUser,
  getUserById,
  deleteUser
} = require('../domain/user');



const jwtSecret = 'mysecret';

const register = async (req, res) => {
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

const login = async (req, res) => {
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

const getAll = async (req, res) => {
  const allUsers = await getAllUser()
  return sendDataResponse(res, 200, allUsers)
}

const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const UserById = await getUserById(id)

    return sendDataResponse(res, 200, UserById)
  } catch (e) {
    console.error(e)
    return sendMessageResponse(res, 500, 'Unable to find user')
  }
}

const deleteOne = async (req, res) => {
  try {
      const id =  parseInt(req.params.id)
      const deletedUser = await deleteUser(id)

      return sendDataResponse(res, 200, deletedUser)
  } catch (e) {
      console.error(e)
      return sendMessageResponse(res, 500, 'Unable to delete user')
  }
}

module.exports = {
  register,
  login,
  getAll,
  getById,
  deleteOne
};