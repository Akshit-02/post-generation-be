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

Guidelines:
- Each image should include BOTH a strong visual concept and bold text overlay.
- The text in the image must be perfectly readable (clear contrast, bold fonts, centered or well-aligned).
- Use high-engagement storytelling style (hook → tension → insight).
- Use a viral social media tone.
- "visualText" should be the exact wording to appear ON the image.
- "imagePrompt" should clearly describe the type of visual background and how the text is placed (e.g., “minimal dark blurred newsroom background with bold white text centered on screen”).
- Avoid cluttered visuals or too many words.
- Return ONLY valid JSON. Do NOT include any additional explanations or commentary.
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
Write an Instagram caption with the following requirements:

Idea: ${idea.idea}
Hook: ${idea.hook}
Story: ${idea.story}

Requirements:
- Use short *viral-style storytelling* (2–4 lines max).
- Start with a *strong hook*.
- Use *relevant and engaging emojis* naturally throughout (not after every word).
- Ask *one thought-provoking question at the end*.
- Add a clear *call to action to follow for daily news insights*.
- Include *3–5 relevant, high-performing hashtags* (lowercase, no spaces).
- Make it sound *authentic, conversational, and scroll-stopping*.
- Avoid generic phrases or filler words.

Return caption only (no explanation).
  `;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return completion.choices[0].message.content;
};
