const express = require('express');
const db = require('./firebase');
const admin =require('firebase-admin')
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        await db.collection('contacts').add({
            name,
            email,
            message,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        res.send(`<script>alert('Form submitted successfully!'); window.location.href = '/';</script>`);
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).json({ message: 'Error submitting form.' });
    }
});

module.exports = router;
