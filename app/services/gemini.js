import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const createImagePrompts = async ({ script, imagePromptsCount }) => {
  try {
    script_template = `
    You are an expert portrait image prompt generator.
    Read the script thoroughly to understand its overall context and theme.
    Generate a detailed portrait image prompt that visually represents the content, emotion, facial expressions and atmosphere for a compelling portrait representation.
    Ensure that each prompt maintains relevance and aligns with the sequence of the script to preserve its flow.
    If the script references a product, service, or advertisement, create a relevant object in the scene with appropriate text, symbols ensuring it blends naturally with the surroundings.
    The total number of prompts should be equal to ${imagePromptsCount} and ensure the entire script is represented.
    
    Return the output as an array of prompts in the following format:
    [
    "First prompt description",
    "Second prompt description",
    ...
    "Last prompt description"
    ]
    Ensure there are no extra keys, indices, or labels — only the prompts enclosed in double quotes within the array.
    Script : "${script}"
    `;
    const prompt = "Explain how AI works";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.log(error);
  }
};
