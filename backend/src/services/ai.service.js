const { GoogleGenAI } = require("@google/genai");

async function generateCaption(imageUrl) {
  const ai = new GoogleGenAI({});

  const response = await fetch(imageUrl);
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64ImageData,
      },
    },
    { text: "Caption this image." }
  ],
  });
  
  return result.text;
}

module.exports = generateCaption;