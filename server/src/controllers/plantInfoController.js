const { GoogleGenAI, HarmCategory, HarmBlockThreshold } = require('@google/genai');
const prompt = require('../utils/plantAnalysisPrompt.json');

const MODEL_NAME = 'gemini-2.5-flash-preview-05-20';
const API_KEY = process.env.GOOGLE_API_KEY;

let genAIInstance;
if (API_KEY) {
  genAIInstance = new GoogleGenAI({ API_KEY });
} else {
  throw new Error('Google API Key Error!');
}

const generationConfig = prompt.generationConfig;

const safetySettings = prompt.safetySettings.map((setting) => ({
  harmCategory: HarmCategory[setting.harmCategory],
  blockThreshold: HarmBlockThreshold[setting.blockThreshold],
}));

const analyzePlantImage = async (req, res) => {
  if (!genAIInstance) {
    return res.status(500).json({ message: 'Ops! Algo de errado aconteceu. Tente novamente mais tarde.' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Não foi possível analisar a imagem. Por favor, envie uma imagem válida.' });
  }

  try {
    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString('base64'),
        mimeType: req.file.mimetype,
      },
    };

    const promptText = prompt.promptText;

    const contentsForApi = [imagePart, { text: promptText }];

    const generationResult = await genAIInstance.models.generateContent({
      model: MODEL_NAME,
      contents: contentsForApi,
      generationConfig,
      safetySettings,
    });

    const response = generationResult.response;
    if (!response) {
      if (typeof generationResult.text === 'function') {
        const text = generationResult.text();
        return res.json({ analysis: text });
      } else if (generationResult.text) {
        return res.json({ analysis: generationResult.text });
      }

      return res.status(500).json({ message: 'Falha ao processar a imagem. Tente novamente mais tarde.' });
    }
    const text = response.text();

    res.json({ analysis: text });
  } catch (error) {
    if (error.message && error.message.includes('SAFETY')) {
      return res.status(400).json({ message: 'Análise de imagem bloqueada devido a configurações de segurança. O conteúdo pode ser inadequado ou prejudicial.' });
    }
    if (error.response && error.response.promptFeedback && error.response.promptFeedback.blockReason) {
      return res.status(400).json({ message: `Análise de imagem bloqueada: ${error.response.promptFeedback.blockReason}. Por favor, tente uma imagem diferente.` });
    }
    res.status(500).json({ message: 'Falha ao analisar a imagem. Por favor, tente novamente mais tarde.' });
  }
};

module.exports = { analyzePlantImage };
