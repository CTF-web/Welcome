
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  exposedHeaders: ['X-CTF-Flag']
}));
app.use(express.json());

const challenges = {

  clue3: {
    title: "The GitHub Secret",
    description: "Congratulations! You decoded the GitHub link.",
    hint: "The final flag is hidden in the response headers. Check the X-CTF-Flag header!"
  }
};

// Hint: Look carefully — you will find a way to reach the flag. You may encounter some fake flags, but you are very close to the end.


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});
