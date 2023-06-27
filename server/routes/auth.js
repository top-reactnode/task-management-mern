const express = require("express");
const router = express.Router();
const RefreshTokens = require("../models/refresh");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils");

// register new user
router.post("/register", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password)
      return res
        .status(400)
        .send({ msg: "Username and password are required" });
    const username = req.body.username;
    if (
      await Users.findOne({
        username: username,
      })
    )
      return res.status(400).send({ msg: "Username already exists" });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userClient = { username: username, password: hashedPassword };
    const newUser = new Users(userClient);
    await newUser.save();
    res.status(201).json({ msg: "User created" });
  } catch (e) {
    res.status(500);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const userClient = {
      username: req.body.username,
      password: req.body.password,
    };
    if (!userClient.username || !userClient.password)
      return res
        .status(400)
        .send({ msg: "Username and password are required" });
    const user = await Users.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(400).send({ msg: "Username does not exist" });
    }
    const realPassword = await bcrypt.compare(req.body.password, user.password);
    if (!realPassword) {
      return res.status(400).send({ msg: "Incorrect password" });
    }
    const accessToken = generateAccessToken({
      username: userClient.username,
      userId: user._id,
    });
    const refreshToken = jwt.sign(
      { username: userClient.username },
      process.env.REFRESH_TOKEN_SECRET
    );
    const newRefreshToken = new RefreshTokens({
      username: userClient.username,
      refreshToken: refreshToken,
    });
    await newRefreshToken.save();
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (e) {
    res.status(500);
  }
});

// refresh access token
router.post("/refresh_token", async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    const user = await RefreshTokens.findOne({ refreshToken: refreshToken });
    if (!user._id) return res.sendStatus(403);
    const myUser = await Users.findOne({ username: user.username });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({
        username: user.username,
      });
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    });
  } catch (e) {
    res.status(500);
  }
});

// delete refresh token from database
router.delete("/logout", async (req, res) => {
  try {
    const refreshToken = req.body.token;
    await RefreshTokens.deleteOne({ refreshToken: refreshToken });
    res.status(200).json({ msg: "Logged out" });
  } catch (e) {
    res.status(500);
  }
});

module.exports = router;
