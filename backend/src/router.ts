import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

export const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post(
    "/auth/register",
    body("handle")
        .notEmpty()
        .withMessage("Handle cannot be empty"),
    body("name")
        .notEmpty()
        .withMessage("Name cannot be empty"),
    body("email")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    handleInputErrors,
    createAccount
);

router.post(
    "/auth/login",
    body("email")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
    handleInputErrors,
    login
);


router.get('/user',getUser)