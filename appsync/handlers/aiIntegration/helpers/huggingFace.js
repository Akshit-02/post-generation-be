import fetch from "node-fetch";

const {
  HUGGING_FACE_API_KEY,
  MODEL = "stabilityai/stable-diffusion-xl-base-1.0",
} = process.env;

export const generateImage = async (item) => {
  const prompt = `
Create a high-quality Instagram post-style image.

Visual Requirements:
- Background: ${item.imagePrompt}
- Add text overlay in **clear, readable English**: "${item.visualText}"
- Use professional graphic design layout.
- Text must be sharp, high-resolution, correctly spelled, and not distorted.
- Bold typography, high contrast against background, positioned cleanly.
- No visual glitches, no random characters, no decorative distortions.
- Modern minimal design, no clutter.
- If needed, slightly blur only the background to increase text clarity.

Generate only the image.
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
        inputs: item?.imagePrompt,
      }),
    }
  );
  console.log("res", response);

  if (!response.ok) {
    throw new Error(`Image generation failed with status: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
};
