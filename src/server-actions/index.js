'use server'

// import Link from "next/navigation"
import connectDB from "@/database";
import User from "@/models/UserModel";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const RegisterUserAction=async(formData)=>{
    console.log("Hello ",formData);
    await connectDB();
    try{
        const{UserName,email,password}=formData;
        const userFound=await User.findOne({email});
        if(userFound){
            return {error:"User already exists ! Try Again with Other email", sucess:false};
        } 
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser =new User({UserName,email:email,password:hashPassword});
        const savedUser=await newUser.save();
        //or simply await User.create({userName,email,password}) will create and save
        if(savedUser){{
            return {data:JSON.parse(JSON.stringify(savedUser)),success:true}; //this will convert the mongoose returned object intoi string and then its parsed to JSON ,after it returns the JS plain Object
        }}
        else{
            return {error:"Error while saving user",success:false};
        }
    }catch(error){
        console.log(error.message);
        return{
            message:"Something Error While Registering !"
           , success:false 
        }
    }
}



export async function loginUserAction(formData){
await connectDB();
    try{
        const {email,password}=formData;
        const userFound=await User.findOne({email});
        if(!userFound){
            return {message:"Error User does not Exist! Please Sign Up",success:false};   
        }
        const isValidPassword=await bcrypt.compare(password,userFound.password);
        if(!isValidPassword){
            return{
                message:"Password is Incorrect Please Check",
                success:false
            };
        }
        const tokenData={
            id:userFound._id,
            UserName:userFound.UserName,
            email:userFound.email
        }
        const token=jwt.sign(tokenData,process.env.secretKey,{expiresIn:'1d'});
        // localStorage.setItem('Token',token);//in servers local storage is not available so use cookies
        const gtCookies=cookies();
        gtCookies.set('Token',token);
        // gtCookies.set("Token", token, {
        //     path: "/",          // Make the cookie available across all routes
        //     httpOnly: true,     // Prevent client-side scripts from accessing the cookie
        //     secure: process.env.NODE_ENV === "production", // Use secure flag in production
        //     maxAge: 24 * 60 * 60 // 1 day (same as '1d' in JWT expiration)
        //   });
        return { message: "Login successful", success: true };
    }catch(error){
        console.log(error.message);
        return{
            message:"Something went Wrong while LoginUserAction!",
            success:false
        }
    }
}


export const fetchAuthUserAction = async () => {
    await connectDB();
    try {
        // Get cookies from next/headers
        const cookieStore = await cookies();
        const token = cookieStore.get('Token')?.value || "";
        console.log(token);
        if (!token) {
            return {
                success: false,
                message: "Please Login First, Token is not valid"
            };
        }

        // Verify JWT token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.secretKey);
            console.log(decodedToken)
;        } catch (error) {
            console.log(error.message);
            return {
                success: false,
                message: "Token is invalid or expired. Please login again."
            };
        }

        // Fetch user data based on decoded token ID
        const getUserInfo = await User.findOne({ _id: decodedToken.id });

        if (getUserInfo) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(getUserInfo)) // Convert to plain JS object
            };
        } else {
            return {
                success: false,
                message: "User not found in the database. Something went wrong."
            };
        }
    } catch (err) {
        console.log("Error in fetching user:", err.message);
        return {
            message: "Error in Fetching Auth User Action!",
            success: false
        };
    }
};


export async function logoutAction() {
    const getCookies = cookies();
    getCookies.set("Token", "", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0 // Expire the cookie immediately
    });
}
