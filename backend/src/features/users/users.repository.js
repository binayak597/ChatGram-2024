import mongoose from "mongoose";
import UserModel from "./users.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class UserRepository {

    getUsersForSidebar = async (loggedInUserId) => {

        try {
            const filteredUsers = await UserModel.find({_id: {
                $ne: loggedInUserId
            }}).select("-password");

            return filteredUsers;
        } catch (err) {
            throw new ApplicationError("Something went wrong", 500); 
        }
    }


    signUp = async (user) => {

        try {
            const newUser = new UserModel(user);

           if(newUser){

            await newUser.save();
            return newUser;
           }else{
            throw new Error("Invalid user data");
           }
            
        } catch (err) {
            
            if(err instanceof mongoose.Error.ValidationError) throw new ApplicationError(err.message, 400);
            else if(err instanceof Error) throw new ApplicationError(err.message, 400);
            else throw new ApplicationError("Something went wrong", 500);
        }
    }

    findUser = async (userName) => {

        try {
            const isUser = await UserModel.findOne({userName});
            return isUser;
        } catch (err) {
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    resetPassword = async (userId, hashedPassword) => {

        try {
            const user = await UserModel.findById(userId);

            if(!user) throw new Error("User is not found");

            user.password = hashedPassword;
            await user.save();
        } catch (err) {
            if(err instanceof Error) throw new ApplicationError(err.message, 404);
            else throw new ApplicationError("something went wrong", 500);
        }
    }
}