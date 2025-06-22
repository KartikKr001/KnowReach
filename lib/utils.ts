import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSubjectColor(subject: string): [string, string] {
  switch (subject.toLowerCase()) {
    case "maths":
      return ["#d1d8e0", "#f5f6fa"]; // cool grey gradient
    case "language":
      return ["#fbc2eb", "#a6c1ee"]; // soft pink to lavender
    case "science":
      return ["#a1c4fd", "#c2e9fb"]; // sky blue to icy blue
    case "history":
      return ["#fceabb", "#f8b500"]; // parchment yellow to golden
    case "coding":
      return ["#c9ffbf", "#ffafbd"]; // mint green to light pink
    case "economics":
      return ["#f6d365", "#fda085"]; // orange-peach gradient
    case "finance":
      return ["#89f7fe", "#66a6ff"]; // bright aqua to blue
    case "business":
      return ["#ffecd2", "#fcb69f"]; // cream to peach
    case "geography":
      return ["#d4fc79", "#96e6a1"]; // greenish earth tone
    default:
      return ["#f0f0f0", "#ffffff"]; // fallback: white-grey
  }
}

// export const getSubjectColor = (subject: string) => {
//   const subjectsColors: Record<string, string> = {
//     maths: "#4F46E5",       // Indigo-600
//     language: "#10B981",    // Emerald-500
//     science: "#06B6D4",     // Cyan-500
//     history: "#F59E0B",     // Amber-500
//     coding: "#0EA5E9",      // Sky-500
//     economics: "#8B5CF6",   // Violet-500
//     finance: "#F43F5E",     // Rose-500
//     business: "#6366F1",    // Indigo-500
//     geography: "#22C55E",   // Green-500
//   };

//   return subjectsColors[subject.toLowerCase()] || "#E5E7EB"; // fallback: Gray-200
// };

// export const configureAssistant = (voice: string, style: string) => {
//   const voiceId = voices[voice as keyof typeof voices][
//           style as keyof (typeof voices)[keyof typeof voices]
//           ] || "sarah";

//   const vapiAssistant: CreateAssistantDTO = {
//     name: "Companion",
//     firstMessage:
//         "Hello, let's start the session. Today we'll be talking about {{topic}}.",
//     transcriber: {
//       provider: "deepgram",
//       model: "nova-3",
//       language: "en",
//     },
//     voice: {
//       provider: "11labs",
//       voiceId: voiceId,
//       stability: 0.4,
//       similarityBoost: 0.8,
//       speed: 1,
//       style: 0.5,
//       useSpeakerBoost: true,
//     },
//     model: {
//       provider: "openai",
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

//                     Tutor Guidelines:
//                     Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
//                     Keep the conversation flowing smoothly while maintaining control.
//                     From time to time make sure that the student is following you and understands you.
//                     Break down the topic into smaller parts and teach the student one part at a time.
//                     Keep your style of conversation {{ style }}.
//                     Keep your responses short, like in a real voice conversation.
//                     Do not include any special characters in your responses - this is a voice conversation.
//               `,
//         },
//       ],
//     },
//     clientMessages: [],
//     serverMessages: [],
//   };
//   return vapiAssistant;
// };