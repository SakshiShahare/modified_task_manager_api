import mongoose , {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema  = new Schema(
    {
        username : {
            type : String,
            required : true
        },

        email : {
            type : String,
            required : true
        },

        password : {
            type  : String,
            required : true
        },

        refreshToken : {
            type : String
        }
    },
    {timestamps : true}
)


export const User = mongoose.model("User", userSchema);

//hashing of password
userSchema.pre("save", async function(next){
    if(!isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
    next();
})
//comparison 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken  = async function(){

    return await jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn  : process.env.ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateRefreshToken  = async function(){

    return await jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn  : process.env.REFRESH_TOKEN_EXPIRY}
    )
}
