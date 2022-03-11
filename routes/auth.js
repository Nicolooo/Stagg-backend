const router = require('express').Router();
const User = require('../models/user');
const { registerValidation,loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', async(req, res) => {
    // validate the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user already exists
    const emailExist = await User.findOne({ email: req.body.email });
    const usernameExists = await User.findOne({ username: req.body.username });
    if (emailExist) return res.status(400).send('Email already exists');
    if (usernameExists) return res.status(400).send('Username already exists');

    const pepper = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, pepper);
    // register the user
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('Email or username is not correct or password mate.. who knows:)');

    const validPassword = await bcrypt.compare(req.body.password,user.password);

    if (!validPassword) return res.status(400).send('Email or username is not correct or password mate.. who knows:)');
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET); 
    res.header('auth-token', token).send(token);
})

module.exports = router;