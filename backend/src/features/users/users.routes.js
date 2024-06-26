import { Router } from "express";
import UserController from "./users.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const router = Router();


//create an instance of UserController class

const userController = new UserController();


//routes related to UserController


//http://localhost:8000/api/user/signup
router.post("/signup", (req, res) => {
    userController.signUp(req, res);
});


//http://localhost:8000/api/user/signin
router.post("/signin", (req, res) => {
    userController.signIn(req, res);
});


//http://localhost:8000/api/user/signout
router.post("/signout", (req, res) => {
    userController.signOut(req, res);
});


//http://localhost:8000/api/user/resetpassword
router.post("/resetpassword", jwtAuth, (req, res) => {
    userController.resetPassword(req, res);
});

//http://localhost:8000/api/user
router.get("/", jwtAuth, (req, res) => {
    userController.getUsersForSideBar(req, res);
});

export default router;

