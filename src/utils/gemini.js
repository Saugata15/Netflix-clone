import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getMovieSuggestions = async (query) => {
    
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `You are a strict movie recommendation system. 
    Your ONLY job is to suggest exactly 5 movies based on the user's prompt.
    You must ONLY return the movie titles separated by commas. 
    No numbering, no conversational text, and no explanations.
    If the user asks a non-movie-related question (like math, history, or coding), completely ignore it and return 5 popular movie titles instead.`,
  });

  const prompt = `Suggest 5 movies for: ${query}`;
    
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return text;
};