import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash", 
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
  }
});

/**
 * Generates a full quiz based on a topic using Gemini AI.
 */
export async function generateQuiz(topic: string) {
  const prompt = `
    Create a highly engaging, viral personality quiz about: "${topic}".
    The quiz should be fun, interactive, and shareable.
    
    Return a JSON object following this structure:
    {
      "title": "Quiz Title",
      "slug": "quiz-slug",
      "description": "Catchy description for the quiz",
      "category": "e.g., dogs, cats, general",
      "questions": [
        {
          "text": "Question text?",
          "order_index": 0,
          "options": [
            { "text": "Option 1", "scores": { "Type A": 3, "Type B": 1 } },
            ...
          ]
        },
        ... (at least 5 questions)
      ],
      "results": [
        {
          "title": "Result Title (e.g., The Golden Retriever Soul)",
          "personality_type": "Type A",
          "description": "Detailed, encouraging personality description",
          "image_url": "Search Unsplash for a relevant keywords and provide a placeholder URL (e.g., https://images.unsplash.com/photo-...) or leave blank"
        },
        ...
      ]
    }
  `;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

/**
 * Analyzes quiz results to provide a "Premium Deep Dive" using Gemini AI.
 */
export async function analyzePersonality(quizTitle: string, personalityType: string, userAnswers: any[]) {
  const prompt = `
    Analyze a user's personality based on a quiz they just took.
    Quiz: ${quizTitle}
    Result: ${personalityType}
    User Answers: ${JSON.stringify(userAnswers)}

    Provide a deep, psychological analysis (approx 1000-1500 words) that includes:
    1. A detailed breakdown of their personality traits.
    2. Strengths and potential blind spots.
    3. Custom lifestyle tips/advice based on their result.
    4. A "Famous Comparisons" section (celebrities/characters with similar traits).
    5. A closing inspirational message.

    Format the response as JSON with a single "analysis" field containing safe HTML or Markdown.
  `;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
