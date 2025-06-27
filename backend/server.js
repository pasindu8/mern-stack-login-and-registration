// අවශ්‍ය libraries import කරගැනීම
require('dotenv').config(); // .env file එකෙන් environment variables load කරගැනීමට
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Cross-Origin Resource Sharing සඳහා

// Express app එක initialize කරගැනීම
const app = express();

// Middleware Setups
app.use(express.json()); // JSON data parse කිරීම සඳහා (req.body එකට data ගන්න)
app.use(cors()); // Frontend (React) එකෙන් එන requests handle කිරීමට CORS enable කිරීම.
                 // ඔබට specific origins වලට විතරක් allow කරන්න පුළුවන්.
                 // ex: app.use(cors({ origin: 'http://localhost:3000' }));

// ======================================
// 1. MongoDB Database Connection Setup
// ======================================
const MONGO_URI = process.env.MONGO_URI; // .env file එකෙන් MongoDB URI එක ලබාගැනීම

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// ======================================
// 2. User Schema සහ Model
// ======================================
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Email එක unique විය යුතුයි
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // created_at, updated_at timestamps automatically add වේ

const User = mongoose.model('User', userSchema); // 'User' නමින් Model එක හදාගැනීම

// ======================================
// 3. User Authentication Routes
// ======================================

// 3.1. Register Route (නව user කෙනෙක් register කිරීම)
app.post('/Register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // සියලු fields පුරවලාද කියලා පරීක්ෂා කිරීම
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields.' });
        }

        // Email එකෙන් user කෙනෙක් ඉන්නවද කියලා පරීක්ෂා කිරීම
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        // නව user object එකක් හදාගැනීම
        user = new User({
            name,
            email,
            password
        });

        // Password එක hash කිරීම (ආරක්ෂාව සඳහා)
        const bcrypt = require('bcryptjs'); // bcryptjs library එක import කිරීම
        const salt = await bcrypt.genSalt(10); // Salt generate කිරීම
        user.password = await bcrypt.hash(password, salt); // Password එක hash කිරීම

        // User ව database එකට save කිරීම
        await user.save();

        res.status(201).json({ message: 'Registration successful!', user: { _id: user._id, name: user.name, email: user.email } });

    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});


// 3.2. Login Route (user කෙනෙක් login කිරීම)
app.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // සියලු fields පුරවලාද කියලා පරීක්ෂා කිරීම
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields.' });
        }

        // Email එකෙන් user ව database එකේ හොයාගැනීම
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found. Please register first.' });
        }

        // Password එක compare කිරීම
        const bcrypt = require('bcryptjs'); // bcryptjs library එක import කිරීම
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. Please check your password.' });
        }

        // සාර්ථක login එකකින් පසුව user data යැවීම (ඔබට JWT token එකක් යවන්නත් පුළුවන්)
        res.status(200).json({ message: 'Login successful!', user: { _id: user._id, name: user.name, email: user.email } });

    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server error during login.' });
    }
});


// ======================================
// 4. Server Start
// ======================================
const PORT = process.env.PORT || 5000; // .env file එකෙන් PORT එක ලබාගැනීම, නැත්නම් 5000 default ලෙස භාවිතා කිරීම

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser (though it's an API, not a web page)`);
});
