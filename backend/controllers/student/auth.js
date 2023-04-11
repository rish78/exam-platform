const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordValidator = require('password-validator');

// const Student = require("../../models/Student")

const router = express.Router();

exports.register = async (req, res) => {
    const { name, email, rollnumber, phonenumber, password } = req.body;
    try {
        const user = await Student.findOne({email: email})

        if (user) {
            return res.status(400).json({
                error: "Email already there, No need to register again.",
            });
        }
        else {
            let schema = new passwordValidator();                                                                // Validating Password conditions

            schema
                .is().min(8)                                                                                     // Minimum length 8
                .is().max(100)                                                                                   // Maximum length 100
                .has().uppercase()                                                                               // Must have uppercase letters
                .has().lowercase()                                                                               // Must have lowercase letters
                .has().digits(2)                                                                                 // Must have at least 2 digits
                .has().not().spaces()                                                                            // Should not have spaces

            if (!schema.validate(password)) {
                return res.status(500).json({
                    error: "Input a Strong Password of minimum 8 characters consisting of upper and lowercase letters and atleast 2 digits."
                })
            }

            else {
                const salt = await bcrypt.genSaltSync(10);
                let pass = await bcrypt.hash(password, salt);
                   
                let newStudent = {name, email, rollnumber, phonenumber, password:pass};
                const customer = new Student(newStudent);
                const data = await customer.save();
                console.log(data);
                res.json({msg: "New customer created..", customer});
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!",                                                      //Database connection error   
        });
    };
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await Student.findOne({email: email});
        if(student){
            if(await bcrypt.compare(password, student.password)){
                const accessToken = jwt.sign(
                    { email,  id: student._id },
                    process.env.JWT_SECRET,
                    
                  );
                 
                  console.log("User token", accessToken)
                  res.json({ msg: "Student logged in!", accessToken});
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
