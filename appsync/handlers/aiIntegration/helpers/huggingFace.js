import fetch from "node-fetch";

const {
  HUGGING_FACE_API_KEY,
  MODEL = "stabilityai/stable-diffusion-xl-base-1.0",
} = process.env;

export const generateImage = async (item) => {
  const prompt = `
Create an Instagram post-style image.

Visual Requirements:
- Background: ${item.imagePrompt}
- Add text overlay: "${item.visualText}"
- Text should be clearly readable (bold, high contrast, centered or clean placement)
- Modern minimal design, no clutter, professional looking
- Include slight depth or blur in background if needed for text clarity

Generate only the image as output.
  `;

  const response = await fetch(
    `https://router.huggingface.co/hf-inference/models/${MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Image generation failed with status: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
};
