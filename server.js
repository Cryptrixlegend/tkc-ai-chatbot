const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Test route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Chat route
app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    console.log('Received question:', question);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Server error!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TKC running on http://localhost:${PORT}`));
