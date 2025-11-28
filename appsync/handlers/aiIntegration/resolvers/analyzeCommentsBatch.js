import fetch from "node-fetch";

const BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const { GEMINI_API_KEY } = process.env;

const preprocessHinglishComment = (comment) => {
  // Common Hinglish normalizations to provide context to AI
  const normalizations = {
    bakwas: "[nonsense-hindi]",
    ullu: "[fool-hindi-mild]",
    pagli: "[crazy-girl-hindi-affectionate]",
    pagal: "[crazy-hindi-context-dependent]",
    sala: "[brother-in-law-hindi-casual]",
    kutta: "[dog-hindi]",
    gadha: "[donkey-hindi]",
    yaar: "[friend-hindi]",
    bhai: "[brother-hindi-respectful]",
    didi: "[sister-hindi-respectful]",
    beta: "[child-hindi-affectionate]",
    ji: "[respectful-suffix-hindi]",
    sahab: "[sir-hindi]",
    bhagwan: "[god-hindi]",
    mata: "[mother-hindi-respectful]",
  };

  let processed = comment;

  Object.entries(normalizations).forEach(([hinglish, context]) => {
    const regex = new RegExp(`\\b${hinglish}\\b`, "gi");
    processed = processed.replace(regex, `${hinglish} ${context}`);
  });

  return processed;
};

const detectHinglishPattern = (comment) => {
  const hinglishIndicators = [
    /\b(kar|hai|kya|tum|main|yaar|bhai|didi)\b/i,
    /\b(pagal|mazak|sach|bhagwan|beta|acha|theek)\b/i,
    /\b(bilkul|zaroor|shayad|bakwas|ullu)\b/i,
    /[a-z]+\s+(hai|kar|kya|tum)\b/i, // Mixed pattern
  ];

  return hinglishIndicators.some((pattern) => pattern.test(comment));
};

async function analyzeComment(comment) {
  const isHinglish = detectHinglishPattern(comment);
  const processedComment = isHinglish
    ? preprocessHinglishComment(comment)
    : comment;

  const prompt = `
    You are an expert content moderation system. Analyze the following comment for inappropriate content across these categories. Provide precise confidence scores (0-100) where 0 = completely safe, 100 = definitely violates policy.

    COMMENT: "${processedComment}"

    ANALYSIS CATEGORIES:
    1. VULGARITY: Profanity, offensive language, crude expressions, sexual innuendo
    2. NUDITY: Explicit sexual content, graphic descriptions, inappropriate imagery references
    3. VIOLENCE: Threats, aggressive language, violent imagery, harm suggestions
    4. HATE_SPEECH: Discriminatory language based on race, religion, gender, sexuality, nationality, disability
    5. SPAM: Repetitive content, excessive self-promotion, irrelevant links, bot-like behavior
    6. HARASSMENT: Personal attacks, bullying, doxxing, targeted intimidation

    SCORING GUIDELINES:
    - 0-25: Safe/minimal concern
    - 26-50: Borderline/context-dependent
    - 51-75: Likely violation
    - 76-100: Clear violation

    IMPORTANT CONSIDERATIONS:
    - Consider context, sarcasm, and cultural nuances
    - Account for emoji meanings and internet slang
    - Be stricter with direct threats/explicit content
    - Consider comment length and repetition patterns
    - Handle Hinglish (Hindi-English code-mixing) appropriately
    - Context-dependent meanings: Hindi words like "pagal" (crazy) can be affectionate
    - Religious/cultural terms that may seem offensive but are common expressions
    - Family terms like "bhai", "didi", "yaar" used casually and respectfully
    - False positives: Common Hindi words that sound offensive in English but aren't

    OUTPUT FORMAT (JSON only, no explanation):
    {
    "vulgarity": {"score": 0, "detected": false, "keywords": []},
    "nudity": {"score": 0, "detected": false, "keywords": []},
    "violence": {"score": 0, "detected": false, "keywords": []},
    "hate_speech": {"score": 0, "detected": false, "keywords": []},
    "spam": {"score": 0, "detected": false, "indicators": []},
    "harassment": {"score": 0, "detected": false, "keywords": []},
    "overall_risk": "low",
    "language_detected": "en",
    "script_detected": "roman",
    "cultural_context": "neutral",
    "requires_human_review": false,
    "summary": "brief explanation"
    }
    `;

  try {
    const response = await fetch(`${BASE_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE", // Allow analysis of all content
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed: ${response.status} - ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No response text received");

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON found in response");

    const result = JSON.parse(jsonMatch[0]);

    // Add metadata
    result.analyzed_at = new Date().toISOString();
    result.is_hinglish = isHinglish;
    result.processed_comment =
      processedComment !== comment ? processedComment : undefined;

    return result;
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      vulgarity: { score: 0, detected: false, keywords: [] },
      nudity: { score: 0, detected: false, keywords: [] },
      violence: { score: 0, detected: false, keywords: [] },
      hate_speech: { score: 0, detected: false, keywords: [] },
      spam: { score: 0, detected: false, indicators: [] },
      harassment: { score: 0, detected: false, keywords: [] },
      overall_risk: "unknown",
      language_detected: "unknown",
      script_detected: "unknown",
      cultural_context: "unknown",
      requires_human_review: true,
      summary: "Analysis failed - requires manual review",
      error: true,
      error_message: error.message,
      analyzed_at: new Date().toISOString(),
      is_hinglish: detectHinglishPattern(comment),
    };
  }
}

export const analyzeCommentsBatchHandler = async (event) => {
  const { comments } = event.arguments;

  const results = await Promise.all(
    comments.map(async (comment) => {
      const analysis = await analyzeComment(comment.text || "");
      return {
        commentId: comment.id,
        analysis,
      };
    })
  );

  return results;
};
