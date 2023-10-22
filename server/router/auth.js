const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const secretKey = 'jayaprasad1234drtyvdflmlsfficientabcdefghijklmn';
const multer = require('multer');
const crypto = require('crypto');
const cors = require('cors');

router.use(cors());
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
// require('../db/conn'); // You may need to configure your database connection

const User = require('../userschema/userschema');

// Middleware to verify JWT token

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for handling image uploads
const handleImageUpload = upload.single('image');


// Define the signup route
router.post('/signup',  handleImageUpload,  async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !work || !password || !cpassword)
    {
      return res.status(400).json({ message: 'Please fill in all the fields' });
    }
    //email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'Email is already registered' });
    }
    // Check if passwords match
    if (password !== cpassword) {
      return res.status(402).json({ message: 'Passwords do not match' });
    }

    // Create a new user without hashing the password
    const newUser = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
});

// Modified /signin route to send user's work data upon successful login
// Modified /signin route to send user's work data and name upon successful login
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email in the database
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({ message: 'User not found' });
    }
   
    // Compare the provided password with the stored password (without hashing)
    if (userExist.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // If the email and password match, you can consider the user authenticated.
    // Retrieve the user's work data and name from the database

    const token = jwt.sign(
      { user_id: userExist._id, email },
      secretKey, // Use your secret key here
      {
        expiresIn: '1h', // Token expiration time (e.g., 2 hours)
      }
    );
    res.cookie('jwtToken', token, { httpOnly: true });
    // Store the token in the user's document in the database
    userExist.token = token;
    await userExist.save();
    // Return the user's work data and name in the response
    return res.status(200).json({ message: 'Successfully signed in', userExist});
   
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken; // Read token from cookies
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Store the decoded user information in the request object
    next();
  });
};

router.post('/', verifyToken, async (req,res) => {
  try {
    // Access the user's information from the request object (req.user)
    const userId = req.user.user_id;
    console.log(userId);

    // Fetch the user's name from the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's name as a response
    
    
    const name = user.name;
    //console.log(work);
    res.json({name: name });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Use the middleware to protect the "about" route
router.post('/about', verifyToken, async (req,res) => {
  try {
    // Access the user's information from the request object (req.user)
    const userId = req.user.user_id;
    console.log(userId);

    // Fetch the user's name from the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's name as a response
    
    const { work, phone, name, image } = user;
   
    res.json({ work: work, phone: phone,name: name,image: {
      data: image.data.toString('base64'), // Convert image data to Base64
      contentType: image.contentType,
    }, });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Logout route
router.get('/logout', verifyToken, async (req, res) => {
  try {
    // Clear the JWT token from the user's document in the database
    const userId = req.user.user_id;

    // Use the findByIdAndUpdate method with promises
    const updatedUser = await User.findByIdAndUpdate(userId, { token: null });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear the JWT token cookie
    res.clearCookie('jwtToken');

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'An error occurred during logout' });
  }
});


router.post('/contact', verifyToken, async (req,res) => {
  try {
    // Access the user's information from the request object (req.user)
    const userId = req.user.user_id;
   // console.log(userId);

    // Fetch the user's name from the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's name as a response
    
   
    const name = user.name;
    const email = user.email;
    const phone = user.phone;
    console.log('about page info');
   console.log(email);
    res.json({ name: name, email: email,phone: phone });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
// Middleware to verify JWT token

// Add a new route to fetch user data

router.get('/user-image', verifyToken, async (req, res) => {
  try {
    // Access the user's information from the request object (req.user)
    const userId = req.user.user_id;

    // Fetch the user's data, including the image, from the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's image as a response
    if (user.image && user.image.data) {
      res.set('Content-Type', user.image.contentType);
      res.send(user.image.data);
    } else {
      return res.status(404).json({ message: 'Image not found for the user' });
    }
  } catch (error) {
    console.error('Error fetching user image:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


const transporter = nodemailer.createTransport({

  service: 'Gmail',
  auth: {
    user: 'jayaprasadb170@gmail.com',
    pass: 'mrsy zhgn afso rgyt'
  }
});

router.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;
 
  const mailOptions = {
    from: email,
    to: 'jayaprasadb718@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});


router.post('/user-email', verifyToken, async (req,res) => {
  try {
    // Access the user's information from the request object (req.user)
    const userId = req.user.user_id;
    console.log(userId);

    // Fetch the user's name from the database based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's name as a response
    
    const {email} = user;
   
    res.json({ email: email });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


router.post("/change-password", async(req, res) => {
  const { email, newPassword } = req.body;
  const userExist = await User.findOne({ email });
  console.log(userExist);
  // Find the user by email in the mock database
  //const user = users.find((user) => user.email === email);

  if (!userExist) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the user's password
  userExist.password = newPassword;
  userExist.cpassword = newPassword;
  console.log(userExist);
  await userExist.save();
  // In a real-world scenario, you would typically hash and securely store the password
  // but for simplicity, we're just updating it in the mock database.

  return res.status(200).json({ message: "Password changed successfully" });
});

function generateResetToken() {
  // Generate a random token using the crypto module
  const token = crypto.randomBytes(32).toString('hex');

  return token;
}


router.post('/send-reset-email', async (req, res) => {
  const { email } = req.body;

  // Compose the email message
  const mailOptions = {
    from: 'jayaprasadb170@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: https://reset-password3-frontend.vercel.app/`,

  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ message: 'An error occurred while sending the reset email' });
  }
});

// Function to generate a random reset token
function generateResetToken() {
  // Generate a random token using the crypto module
  const token = crypto.randomBytes(32).toString('hex');
  return token;
}


module.exports = router;
