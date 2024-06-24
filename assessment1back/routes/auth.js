const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


router.post('/register', async(req,res) => {
    const {contact, email, password,data} = req.body;
    console.log(email,password);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        let user = new User({
            ...req.body,
            password:hashedPassword,
        });

        const emailExist = await User.findOne({email});
        if(emailExist){
            res.send({message:"email already exist."})
        }else if(data === "afterlogin"){
            user = await user.save();
            const allusers = await User.find({});
            res.status(200).send(allusers);
        }else {
            user = await user.save();
            res.status(200).send({
                _id:user?._id,
                name:user?.name,
                email:user?.email,
                contact:user?.contact,
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/login", async(req,res) => {
    const {email,password} = req.body;
    try {
        if(req.body.email && req.body.password){
            let user = await User.findOne({email});
            if(user){
                let validated = await bcrypt.compare(password,user.password);
                if(validated){
                    res.send({
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        contact:user.contact,
                    })
                }else{
                    res.send({message:"Invalid password."})
                }
            }else{
                res.send({message:"Email doesn't exist."})
            }
        }else{
            res.send({message:"Email and password are required"});
        }
    } catch (error) {
        res.send({message:error})
    }
})

router.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
  
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.put('/users/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const { name, email, contact } = req.body;
        console.log(name, email, contact, userId);
      // Validate user input (e.g., email format, password strength)
  
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      existingUser.name = name;
      existingUser.email = email;
      existingUser.contact = contact;
  
      let updatedUser = await existingUser.save();
  
      res.status(200).json({
        message: 'User information updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.delete('/usersdelete/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find the user by ID and delete them
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Retrieve the remaining users
      const remainingUsers = await User.find();
  
      // Send the remaining users to the frontend
      res.status(200).json(remainingUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;