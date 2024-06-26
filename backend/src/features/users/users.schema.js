import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        maxLength: [25, "Name should not be less than 25 characters"],
        required: true
    },
    userName: {
        type: String,
        maxLength: [10, "Username should not be exceeded more than 10 characters"], 
        required: true,
        unique: true
    },
    email: {
        type: String,
        match: [/.+\@.+\../, "Please enter a valid email"],
        required: true,
        unique: true
    },
    password: {
        type: String, 
        // validate: {
        //     validator: function(value) {
        //         return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
        //     },
        //     message: "Password should be in between 8-12 characters and have a special character"
        // },
        required: true
    },
    gender: {
        type: String,
        enums: ["male", "female"],
        required: true
    },
    profilePic: {
        type: String, 
        default: ""
    }
},
{
    //createdAt, updatedAt
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;