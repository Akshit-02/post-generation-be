import Groq from "groq-sdk";

const { GROQ_API_KEY } = process.env;

const groq = new Groq({ apiKey: GROQ_API_KEY });

export const generateIdeas = async (items) => {
  const combinedNews = items.map((n, i) => `${i + 1}. ${n.title}`).join("\n");

  const prompt = `
Based on these news headlines:
${combinedNews}

Generate 10 viral Instagram content ideas in this JSON format ONLY:

[
  {
    "idea": "",
    "hook": "",
    "story": "",
    "visualText": "",
    "imagePrompt": ""
  }
]

Return ONLY valid JSON. Do NOT include any other text.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return JSON.parse(completion?.choices?.[0]?.message?.content);
};

export const generateCaption = async (idea) => {
  const prompt = `
Write an Instagram caption for:
Idea: ${idea.idea}
Hook: ${idea.hook}
Story: ${idea.story}

Style: Viral storytelling.
Ask 1 question at the end.
Call to action: Follow for daily news insights.
  `;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return completion.choices[0].message.content;
};
