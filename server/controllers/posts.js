import mongoose from 'mongoose'
import PostMessage from "../models/postMessage.js"


export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()


        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({
            messgage: error.messgage
        })
    }
}


export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;
    // lay ra req.body

    const newPost = new PostMessage({ title, message, selectedFile, creator, tags });// tao ra doi tuong req.body
    try {
        await newPost.save();//luu no vao trong db
        res.status(200).json(newPost)
    } catch (error) {
        res.status(404).json({ messgage: error.messgage })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params

    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("ko co post nao dc tim thay")
    }
    const updatepost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })
    res.json(updatepost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("ko co post nao dc tim thay")
    }
    await PostMessage.findByIdAndRemove(id)

    res.json({ message: 'delete successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if (!req.userId) return res.json({ message: 'Nguoi dung chua xac thuc' })
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("ko co post nao dc tim thay")
    }

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))

    if (index === -1) {
        //like the post
        post.likes.push(req.userId)
    } else {
        //dislike
        post.likes = post.like.filter((id) => id !== String(req.userId))
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    return res.json(updatePost)
}