import generateTokenAndSetCookie from "../../utils/generateToken.js";
import UserModel from "./users.model.js";
import UserRepository from "./users.repository.js";
import bcrypt from "bcryptjs";



export default class UserController{

    constructor() {
        this.userRepository = new UserRepository();
    }


    getUsersForSideBar = async (req, res) => {

        try {

            const loggedInUserId = req.userId;

            const users = await this.userRepository.getUsersForSidebar(loggedInUserId);
            
            if(!users) return res.status(200).json({users: []});
            return res.status(200).json({users});
        } catch (err) {
            console.error("error while getUserForSidebar controller -> " + err.message);
            return res.status(err.statusCode).json({error: err.message});
        }
    }

    signUp = async (req, res) => {

        try {
            const {fullName, userName, email, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword) return res.status(400).json({error: "Password does not match"});

        const user = await this.userRepository.findUser(userName);

        //whether username is exist or not
        if(user) return res.status(400).json({error: "Username is already exist"});

        //hash the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        //get he random profile pic for boy and girl depend upon gender

        const boyProfilePic = "https://avatar.iran.liara.run/public/boy";
        const girlProfilePic = "https://avatar.iran.liara.run/public/girl";
        
        const newUser = new UserModel(fullName, userName, email, hashedPassword, gender, gender === "male"? boyProfilePic: girlProfilePic);

         const createdUser = await this.userRepository.signUp(newUser);

         return res.status(201).json({
            _id: createdUser._id,
            fullName: createdUser.fullName,
            userName: createdUser.userName,
            gender: createdUser.gender,
            boyProfilePic: createdUser.profilePic
         });

        } catch (err) {
            
            console.error("error while signup controller -> " + err.message);
            return res.status(err.statusCode).json({error: err.message});
        }
    }
    
    signIn = async (req, res) => {

        try {
            const {userName, password} = req.body;

            const isUser = await this.userRepository.findUser(userName);

            if(!isUser) return res.status(404).json({error: "Incorrect credientials"});

            //compare password
            const isPassword = await bcrypt.compare(password, isUser.password);

            if(!isPassword) return res.status(404).json({error: "Incorrect credientials"});

            generateTokenAndSetCookie(isUser._id, isUser.email, res);

            return res.status(200).json({
                _id: isUser._id,
                fullName: isUser.fullName,
                userName: isUser.userName,
                gender: isUser.gender,
                boyProfilePic: isUser.profilePic
            })
        } catch (err) {
            console.error("error while signin controller -> " + err.message);
            return res.status(err.statusCode).json({error: err.message});
        }


    }

    signOut = (req, res) => {

        try {
            res.clearCookie("jwtToken");
            return res.status(200).json({message: "Logout successfully"});
        } catch (err) {
            console.error("error while signout controller -> " + err.message)
            return res.status(500).json({error: "Something went wrong"});
        }
    }

    resetPassword = async (req, res) => {

        try {
            const {newPassword} = req.body;

            const userId = req.userId;

            //hash the new password
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(newPassword, salt);

            await this.userRepository.resetPassword(userId, hashedPassword);

            return res.status(200).json({message: "Password updated"});

        } catch (err) {
            console.error("error while resetPassword controller -> " + err.message)
            return res.status(err.statusCode).json({error: err.message});
        }


    }
}