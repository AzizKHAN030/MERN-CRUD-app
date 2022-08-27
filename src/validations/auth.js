import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid format of email").isEmail(),
  body("password", "Password should be 5 characters minimum").isLength({
    min: 5,
  }),
  body("fullName", "Enter your name").isLength({
    min: 3,
  }),
  body("userImg", "Invalid link to image").optional().isURL(),
];
