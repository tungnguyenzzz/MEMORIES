import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({
            message: 'email khong ton tai'
        })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: 'khong dung mat khau' })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong, chet server' })
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(404).json({
            message: 'email da ton tai vui long dien email khac'
        })

        if (password !== confirmPassword) return res.status(400).json({ message: 'password khong trung nhau' })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })


        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })

        res.status(200).json({ result, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'something wrong, chet server' })

    }
}