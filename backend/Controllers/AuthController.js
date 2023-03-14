import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../util/generateTokens.js";


export const Register = asyncHandler(async (req, res) => {
  
    const { firstName, lastName, email, mobileNumber, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
      
    }else{

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    if(savedUser){
    res.status(201).json({savedUser,token:generateToken(savedUser._id)})
  }else{
      res.status(400);

      throw new Error("error occured");
  }
  
 
}});

// login user
export const login = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400);
        throw new Error("invalid credentials..");
      }else{
        res.status(200).json({ token: generateToken(user._id), user });
      }
    }else{

      res.status(401);
     throw new Error( "User not found" );
      
    }

});
