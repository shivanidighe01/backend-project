import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true      //index help when we have to search the user using username
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            
        },
        fullName:
        {
            type:String,
            required:true,
            trim:true,
            index:true      //index help when we have to search the user using username
        },
        avtar:
        {
            type:String,    //we upload the images files to third party service and this third party 
            required:true,   //services provide us the url of this images and files and this we will store in the database
            
        },
        coverImage:
        {
            type:string
        },
        watchHistory: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:
        {
            type:string,
            required:true

        },
        refreshToken:
        {
            type:string
        }
    },
    {
        timestamps:true
    })

    userSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return next();
    
        this.password = await bcrypt.hash(this.password, 10)
        next()
    })
    
    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password)
    }
    
    userSchema.methods.generateAccessToken = function(){
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateRefreshToken = function(){
        return jwt.sign(
            {
                _id: this._id,
                
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }
    




    export const User=mongoose.model("User",userSchema)