import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/search", async (req, res) => {
  try {
    const { query } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Suggest 5 movies for: ${query}`,
    });

    res.json({ result: response.output_text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));