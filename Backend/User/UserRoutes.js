import express from 'express';
const router = express.Router();

import User from './UserModel.js';

//register a new user
router.post('/register', async (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;
    if (!FirstName || !LastName || !Email || !Password) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    try{
        const existingUser = await User.findOne({ Email });
        if(existingUser){
            return res.status(409).json({ message: "User already exists" , data: null ,success:false });
        }
        const user = new User({ FirstName, LastName, Email, Password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" , data:user , success:true});
    }catch(error){
        res.status(500).json({ message: `here is the error -> ${error.message }`, success:false});   
    }
})


// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json( {data:users , success:true , message:"Users fetched successfully"} );
  } catch (error) {
    res.status(500).json({data:null , success:false , message: `here is the error ->${error.message}` });
  }
});

// GET a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ data:null , success:false , message: 'User not found' });
    }
    res.status(200).json({data:user, success:true , message:"User fetched successfully"});
  } catch (error) {
    res.status(500).json({data:null , success:false , message: `here is the error ->${error.message}`  });
  }
});

// GET a single user by Email
router.get('/email/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ data: null, success: false, message: 'User not found with this email' });
    }
    res.status(200).json({ data: user, success: true, message: "User fetched successfully" });
  } catch (error) {
    res.status(500).json({ data: null, success: false, message: `here is the error ->${error.message}` });
  }
});


// UPDATE a user
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({data:null , success:false , message: 'User not found' });
    }
    const { FirstName, LastName, Email, Password } = req.body;
    user.FirstName = FirstName;
    user.LastName = LastName;
    user.Email = Email;
    user.Password = Password;
    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({data:null , success:false , message: `here is the error ->${error.message}`  });
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(404).json({data:null , success:false , message: 'User not found' });
    }
    res.status(200).json({data:user , success:true , message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({data:null , success:false , message: `here is the error ->${error.message}`  });
  }
});

// LOGIN a user
router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    if (!user || user.Password !== Password) {
      return res.status(401).json({data:null , success:false , message: 'Invalid email or password' });
    }
    res.status(200).json({data:user , success:true , message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({data:null , success:false , message:`here is the error ->${error.message}` });
  }
});

export default router;