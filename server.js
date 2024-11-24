const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to BK Lawn Service API!');
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Simulate saving to a database or sending an email
    console.log(`Contact form submitted by ${name}, email: ${email}, message: ${message}`);
    res.status(200).json({ message: 'Message sent successfully!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/lawn_service', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
