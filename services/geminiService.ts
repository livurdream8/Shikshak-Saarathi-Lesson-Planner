import { GoogleGenAI, Type } from "@google/genai";
import { FormData, LessonPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const LESSON_PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    basicInfo: {
      type: Type.OBJECT,
      properties: {
        class: { type: Type.STRING },
        subject: { type: Type.STRING },
        topic: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        totalPeriods: { type: Type.NUMBER }
      },
      required: ["class", "subject", "topic", "difficulty", "totalPeriods"]
    },
    learningOutcomes: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    tlm: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    periods: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          period: { type: Type.NUMBER },
          objective: { type: Type.STRING },
          activity: { type: Type.STRING },
          quickCheck: { type: Type.STRING },
          homework: { type: Type.STRING }
        },
        required: ["period", "objective", "activity", "quickCheck", "homework"]
      }
    },
    assessmentPlan: {
      type: Type.OBJECT,
      properties: {
        ongoing: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        summative: { type: Type.STRING }
      },
      required: ["ongoing", "summative"]
    },
    teacherReflection: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ["basicInfo", "learningOutcomes", "tlm", "periods", "assessmentPlan", "teacherReflection"]
};

export const generateLessonPlan = async (data: FormData): Promise<LessonPlan> => {
  const prompt = `Create a concise but complete 5-6 period lesson plan for an Indian middle school (Class ${data.class}) aligned with NEP 2020 and NCTE.
  Subject: ${data.subject}
  Topic: ${data.topic}
  Difficulty: ${data.difficulty}
  
  Guidelines:
  - Use simple, teacher-friendly English.
  - Include at least 1 innovative/fun activity per period.
  - Ensure all examples are from Indian context (e.g., local environment, daily Indian life, Indian scientists, history, or culture).
  - No unnecessary explanations.
  - Learning Outcomes: 4-6 short, observable outcomes using action verbs.
  - TLM: 3-5 low/no-cost materials.
  - Period plans: exactly 40 mins each.
  - Period activity: 3-5 lines, clearly mentioning teacher & student roles.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-preview',
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: LESSON_PLAN_SCHEMA,
      temperature: 0.7
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  
  return JSON.parse(text) as LessonPlan;
}
