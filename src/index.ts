require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Request, Response } from "express";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Worldddddds");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);
  const token = jwt.sign(
    {
      email: req.body.email,
      password: req.body.password,
    },
    "sercret123"
  );
  res.json({
    success: true,
    token: token,
  });
});

app.listen(4444, () => {
  console.log("Server started on port: 4444");
});
