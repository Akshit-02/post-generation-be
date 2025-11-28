import fetch from "node-fetch";

const { HUGGING_FACE_API_KEY } = process.env;

export const generateImage = async (prompt) => {
  const model = "stabilityai/stable-diffusion-xl-base-1.0";

  const response = await fetch(
    `https://router.huggingface.co/hf-inference/models/${model}`,
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

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
};
