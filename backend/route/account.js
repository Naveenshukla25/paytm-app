const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
    message: "hello",
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  //fetch account balance
  const account = await Account.findOne({
    userId: req.userId,
  });

  if (!account || account.balance < amount) {
    return res.status(400).json({
      message: " Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account credential",
    });
  }

  // perform transcation
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  );

  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  //commit the transaction
  res.json({
    message: "Transfer Succesfully done!.",
  });
});

module.exports = router;
