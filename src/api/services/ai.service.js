const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Generates a blog content suggestion based on a user's prompt.
 * @param {string} prompt - The user's input, like a title or a starting sentence.
 * @returns {Promise<string>} - The generated content suggestion.
 */
async function generateContentSuggestion(prompt) {
  try {
    const fullPrompt = `
      You are a helpful blog writing assistant.
      Based on the following topic or starting sentence, write an engaging introductory paragraph for a blog post.
      Keep it concise, informative, and around 100-150 words.
      
      Topic: "${prompt}"
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating content with AI:", error);
    throw new Error("Failed to generate AI suggestion.");
  }
}

module.exports = { generateContentSuggestion };
