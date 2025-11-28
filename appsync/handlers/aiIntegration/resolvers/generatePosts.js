import { generateCaption } from "../helpers/groq.js";
import { generateImage } from "../helpers/huggingFace.js";
import { uploadToS3 } from "../helpers/s3.js";

export const generatePostsHandler = async (event) => {
  try {
    const { input = [] } = event.arguments;

    const posts = [];

    for (let item of input) {
      const [caption, image] = await Promise.all([
        generateCaption(item),
        generateImage(item),
      ]);

      const imageKey = await uploadToS3(
        `public/posts/${item.idea}-${Date.now()}`,
        image,
        "image/png"
      );
      posts.push({ ...item, caption: caption, imageUrl: imageKey });
    }

    return { success: true, message: "Posts generation triggered", posts };
  } catch (error) {
    console.error("Error in generatePostsHandler:", error);
    return { success: false, message: "Failed to generate posts" };
  }
};
