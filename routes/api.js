const posts = require("../models/posts")
const express = require('express');
const router = express.Router()


router.use( express.json())


router.get("/all", (req, res)=>{
    res.json(JSON.stringify(posts.getAll()))
})


router.post("/new", (req,res)=>{

    let title = req.body.title;
    let description = req.body.description;

    posts.newPost(title, description)

    res.send("Posts add")
})


router.delete("/del", (req,res)=>{
    let id = req.body.id;
    posts.deletePost(id)
    
    res.send('Post deleted')
})


module.exports = router