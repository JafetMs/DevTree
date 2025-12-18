import { authenticate } from './middleware/auth';
import { Router } from "express";
import express from 'express';
import { body } from "express-validator";
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from "./handlers";
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


router.get('/user',authenticate, getUser);

router.patch('/user',
    body("handle")
        .notEmpty()
        .withMessage("Handle is required"),
    body("description"),
    authenticate,
    updateProfile);


router.post('/user/image',
    authenticate, 
    uploadImage);


router.get('/:handle', getUserByHandle);


router.post('/search', 
     body("handle")
        .notEmpty()
        .withMessage("Handle is required"),
        handleInputErrors,
        searchByHandle
)