const express = require("express");
import { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Worls");
});

app.listen(4444, () => {
  console.log("Server started on port: 4444");
});
