const { GoogleGenAI } = require("@google/genai");

async function generateCaption(base64ImageData) {
  const ai = new GoogleGenAI({});

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `
You are a creative caption generator for social media.  

Rules:
- Generate short, catchy, and fun captions.  
- Use emojis only if they match the mood of the image.
- Generate a single caption per image. 
- Keep it natural, friendly, and engaging.  
- Avoid being too generic.  
  `,
    },
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      { text: "Caption this image." },
    ],
  });

  return result.text;
}

module.exports = generateCaption;
