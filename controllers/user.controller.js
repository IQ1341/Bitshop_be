import UserModel from "../models/user.model.js";
import sendEmail from "../config/sendEmail.js";
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTempplate.js";
import jwt from "jsonwebtoken";

 export async function registerUserController(request,response) {
    try {
        const {name,email,password} = request.body
        if (!name || !email || !password){
            return response.status(400).json({
                message : "Provide name,email,password",
                error : true,
                success : false
            })
        }
        const user = await UserModel.findOne({email})
        if(user){
            return response.json({
                message : "Alredy register email",
                error : true,
                success : false
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload ={
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verifikasi Email dari BITSHOP",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })
        return response.json({
            message : "Anda Berhasil registrasi",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function verifyEmailController(request,response) {
    try {
        const { code } = request.body
        const user = await UserModel.findOne({_id : code })
        if (user){
            return response.status(400).json({
                message : "invalide code",
                error : true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({_id : code },{
            verify_email : true
        })
        return response.json({
            message : "Verikasi Email selesai",
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function loginController(request,response) {
    try {
        const {email , password} = request.body
        if(!email || !password){
            return response.status(400).json({
                message : "Masukkan Email,Password",
                error : true,
                success : false
            })
        }
        const user = await UserModel.findOne({email})

        if (!user) {
            return response.status(400).jason({
                message : "User belum login",
                error : true,
                success : false
            })
        }

        if (user.status !== "Active") {
            return response.status(400).jason({
                message : "Contact to admin",
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)
        if (!checkPassword) {
            return response.status(400).json({
                message : "Check Password Anda",
                error : true,
                success : false
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken',accessToken,cookiesOption)
        response.cookie('refreshToken',refreshToken,cookiesOption)
        return response.json({
            message : "Login berhasil",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function logOutController(request,response) {
    try {
        const userId = request.userId
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.clearCookie("accessToken",cookiesOption)
        response.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{
            refresh_token : ""
        })
        return response.json({
            message : "Berhasil LogOut",
            erro : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function uploadAvatar(request,response) {
    try {
        const userId = request.userId
        const image = request.file

        const upload = await uploadImageCloudinary(image)
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "Upload Profil",
            data : {
                _id : userId,
                avatar : upload.url
            }
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function updateUserDetails(req,res) {
    try {
        const userId = req.userId
        const {name, email, mobile,password} = req.body

        let hashPassword = ""

        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }
        const updateUser = await UserModel.updateOne({_id : userId},{
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(mobile && {mobile : mobile}),
            ...(password && {password : password})
        })

        return res.json({
            message : "User berhasil di Update",
            error : false,
            success : true,
            data : updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true ,
            success : false
        })
    }
 }

 export async function forgotPasswordController(req,res) {
    try {
        const { email } = req.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message : "Email tidak Valid",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp()
        const expireTime = new Date() + 60 * 60 * 100

        const update = await UserModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toDateString()
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from BITSHOP",
            html : forgotPasswordTemplate ({
                name : user.name,
                otp : otp
            })
        })

        return res.json({
            message : "Cek Email anda",
            error : false,
            success : true,
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function verifyForgotPasswordOtp(req,res) {
    try {
        const {email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                message : "Isikan email atau otp yang benar",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const currentTime = new Date().toDateString()
        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message : "OTP is Expired",
                error : true,
                success : false
            })
        }

        if (otp !== user.forgot_password_otp) {
            return res.status(400).json({
                message : "Invalid OTP",
                error : true,
                success : false
            })
        }

        return res.json({
            message : "Verify OTP Succesfully",
            error : false,
            success :true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function resetPassword(req,res) {
    try {
        const { email, newPassword, confirmPassword } = req.body

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message : "Provide required fields email, newPassword, confirmPassword",
                error : true,
                success : false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message : " Email not available",
                error : true,
                success : false
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message : "newPassword & confirmPassword not same",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword,salt)
        const update = await UserModel.findByIdAndUpdate(user._id,{
            password : hashPassword
        })

        return res.json({
            message : "Password update successfully",
            error : false,
            success : true
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }

 export async function refreshToken(req,res) {
    try {
        const refreshToken = req.cookies.refreshToken || req?.header?.authorization?.split("")[1]

        if (!refreshToken) {
            return res.status(400).json({
                message : "Unauthorized access",
                error : true,
                success :false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return res.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id
        const newAccessToken = await generatedAccessToken(userId)
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.cookie('accessToken',newAccessToken,cookiesOption)

        return res.json({
            message : "New access token successfully",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
 }