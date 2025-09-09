const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { Account } = require("../db");
const JWT_SECRET = require("../config");

router.use(express.json());

router.get("/", (req, res) => {
  res.send("User route is working");
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    username: body.userName,
  });
  if (user?._id) {
    return res.json({
      message: "User already exist",
    });
  }
  const dbuser = await User.create({
    username: body.userName,
    firstName: body.firstName,
    lastName: body.lastName,
    password: body.password,
  });
  const token = jwt.sign(
    {
      userId: dbuser?._id,
    },
    JWT_SECRET
  );

  //-- creating Bank customer-account
  const userId = dbuser._id;
  Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/login", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    username: body.userName,
    password: body.password,
  });
  const token = jwt.sign(
    {
      userId: user?._id,
    },
    JWT_SECRET
  );

  if (user?._id) {
    return res.json({
      message: "User login successfully",
      token: token,
      users: {
        firstName: user.firstName,
      },
    });
  }
  res.json({
    message: " Invalid Credentials",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName, // dont send password to client
      _id: user._id,
    })),
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName, // dont send password to client
    _id: user._id,
  });
});

module.exports = router;
