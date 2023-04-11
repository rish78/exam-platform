const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Teacher = require("../../models/Teacher");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const teacher = await Teacher.findOne({email: email});
        if(teacher){
            if(await bcrypt.compare(password, teacher.password)){
                const accessToken = jwt.sign(
                    { email,  id: teacher._id },
                    process.env.JWT_SECRET,
                    
                  );
                 
                  console.log("User token", accessToken)
                  res.json({ msg: "Teacher logged in!", accessToken});
            }
            else{
                res.status(400).json({msg: "Incorrect password!"});
            }
        }
        else{
            res.status(400).json({msg: "Email not registered!"})
        }
                
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!",                                                //Database connection error
        });
    };
};

module.exports = router;