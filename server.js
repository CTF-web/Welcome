
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
  clue1: {
    title: "The Beginning",
    description: "Welcome to the CTF Challenge! Your journey starts here.",
    hint: "Sometimes the most obvious places hide the best secrets. Check the source code!"
  },
  clue2: {
    title: "The Hidden Path",
    description: "You found the frontend clue! Now look deeper into the backend code.",
    hint: "Base64 is your friend. Look for encoded strings in comments."
  },
  clue3: {
    title: "The GitHub Secret",
    description: "Congratulations! You decoded the GitHub link.",
    hint: "The final flag is hidden in the response headers. Check the X-CTF-Flag header!"
  }
};

// Routes
app.get('/api/clue/:level', (req, res) => {
  const level = req.params.level;
  const challenge = challenges[`clue${level}`];
  
  if (challenge) {
    // Easter egg: Add flag in header for advanced users
    if (level === '3') {
      res.setHeader('X-CTF-Flag', 'CTF{Y0u_F0und_Th3_H1dd3n_Fl4g_C0ngr4ts!}');
    }
    res.json(challenge);
  } else {
    res.status(404).json({ error: "Clue not found" });
  }
});

// Verification endpoint
app.post('/api/verify', (req, res) => {
  const { flag } = req.body;
  const correctFlag = 'CTF{Y0u_F0und_Th3_H1dd3n_Fl4g_C0ngr4ts!}';
  
  if (flag === correctFlag) {
    res.json({ 
      success: true, 
      message: "🎉 Congratulations! You've completed the CTF challenge!",
    });
  } else {
    res.json({ 
      success: false, 
      message: "Incorrect flag. Keep searching!" 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});
