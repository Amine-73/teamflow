import bcrypt from  "bcryptjs";
import User from "../models/User.js";




export const authUser = async (req, res, next) => {
    try {
        // 1. Extract username, email and password
        const {username,email,password}=req.body;

        // 2. Validate required fields
        if(!username || !email || !password){
            return res.status(400).json({success:false,message:"username ,email and password required !!"})
        }

        // 3. Check if email already exists
        const existingUser=await User.findOne({email:email})
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // 4. Hash the password
        const hashedPassword=await bcrypt.hash(password,10)

        // 5. Create and save the user
        const user=new User({
            username:username,
            email:email,
            password:hashedPassword
        })
        await user.save()
        const data={
            id:user._id,
            username:user.username,
            email:user.email,
        }

        // 6. Return user data without password
        res.status(201).json({success:true,message:"the user created successfully ",data})
    } catch (error) {
        // 7. Handle duplicate email error
    
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }
        
        // 8. Pass unexpected errors to next()
        next(error)
    }
};