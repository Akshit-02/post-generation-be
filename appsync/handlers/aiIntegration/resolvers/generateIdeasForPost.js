import { generateIdeas } from "../helpers/groq.js";
import { getNews } from "../helpers/parser.js";

export const generateIdeasForPostHandler = async (event) => {
  try {
    const { industry } = event.arguments;

    const newsResponse = await getNews(industry);

    const ideasResponse = await generateIdeas(newsResponse);

    return {
      success: true,
      message: "Ideas generation triggered",
      ideas: ideasResponse,
    };
  } catch (error) {
    console.error("Error in generateIdeasForPost:", error);
    return { success: false, message: "Failed to generate ideas" };
  }
};
