import mongoose ,{Schema} from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: `https://placehold.co/200x200`,
                localPath: "",
            }
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true,
            trim: true
        },
        FullName: {
            type: String,
            trim: true,

        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        role: {
            type: String, 
            enum: ['admin' , 'project_admin' , 'member'],
            default: "member"
        },
        phoneNo: {
            type: String,
            trim: true,
            lowercase: true,
            minlength: 10,
            maxlength: 10
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpiry: {
            type: Date
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        },
    },
    { timestamps: true }
);






userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
};



userSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    this.password = await bcrypt.hash(this.password, 10)
});


userSchema.methods.generateAccessToken =  function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};



userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}



userSchema.methods.generateTempToken = async function () {
    const unHashedToken = crypto.randomBytes(32).toString('hex')

    const HashedToken = crypto
        .createHash('sha256')
        .update(unHashedToken)
        .digest('hex')

    const tokenExpiry = Date.now() + (5 * 60 * 1000)  // 5min 


    return { unHashedToken, HashedToken, tokenExpiry }
}





export default mongoose.model('User', userSchema)