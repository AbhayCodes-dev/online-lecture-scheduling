const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

router.post('/register', async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;
    let user = await User.findOne({email});
    if(user) return res.status(400).json({msg:'User exists'});
    user = new User({name,email,password,role});
    await user.save();
    res.json({msg:'registered'});
  }catch(err){ res.status(500).json({msg:err.message}); }
});

router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'Invalid credentials'});
    const matched = await user.matchPassword(password);
    if(!matched) return res.status(400).json({msg:'Invalid credentials'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  }catch(err){ res.status(500).json({msg:err.message});}
});

router.get('/me', protect, (req,res)=> {
  res.json(req.user);
});

module.exports = router;
