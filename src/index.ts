require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/User";

mongoose
  .connect(process.env.MGDB_URL as string)
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    const error = err as undefined;
    console.log("Error connecting to DB", error);
  });

const app = express();

app.use(express.json());

app.post(
  "/auth/register",
  registerValidation,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
      });

      const user = await doc.save();

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Couldn't register the user",
      });
    }
  }
);

app.listen(4444, () => {
  console.log("Server started on port: 4444");
});
