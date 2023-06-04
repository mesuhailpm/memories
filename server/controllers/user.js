import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = 'confidential'
const expirationTime='1h' //10 seconds

export const signup = async (req,res)=>{
    try {
        const {email,password,confirmPassword,firstName,lastName} = req.body
        if(password!==confirmPassword) return res.status(400).json({message:'passwords don\'t match'})
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).json({message:'Accout already exists'})
        const hashedPassword = await bcrypt.hash(password,12)
        const newUser = await User.create({email:email,password:hashedPassword,name:`${firstName} ${lastName}`})
        const token = await jwt.sign({email:newUser.email, id:newUser._id}, secret, {expiresIn:expirationTime})
        console.log(email,newUser._id,token)
        res.status(201).json({email,id:newUser._id,token,name:newUser.name})

    } catch (error) {
        console.log(error)
    }
}
export const signin =async (req,res)=>{
    try {
        const {email,password} = req.body
        // console.log(req.body)
        const existingUser = await User.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if (!existingUser || !isPasswordCorrect) return res.status(401).json({message:'Invalid credentials'})
        const token = await jwt.sign({email,id:existingUser._id},secret,{expiresIn:expirationTime})
        // console.log(email,existingUser._id,token,'from server side controller')


        res.status(201).json({email,id:existingUser._id,token,name:existingUser.name})

    } catch (error) {
        console.log(error)
    }


}
export const generatetoken =async(req,res)=>{
    try {
        const {email,name} = req.body
        let id = req.body.sub
        console.log(req.body)
        const existingUser= await User.findOne({email})
        if(existingUser) id = existingUser.id

        const token = await jwt.sign({email,id},secret,{expiresIn:expirationTime})

        res.status(201).json({email,name,token,id})
    } catch (error) {
        console.log(error)
    }

}
