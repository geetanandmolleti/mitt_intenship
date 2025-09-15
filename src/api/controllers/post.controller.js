// In post.controller.js
const aiService = require('../services/ai.service');

// ... other controller methods for CRUD ...

exports.getAiSuggestion = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const suggestion = await aiService.generateContentSuggestion(prompt);
    res.status(200).json({ suggestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// In post.routes.js - This route must be protected by authentication middleware
const { requireAuth } = require('../middleware/requireAuth');
// ...
router.post('/suggest-content', requireAuth, postController.getAiSuggestion);
