import { GenerateEmailTemplateAIModel } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse incoming request
    const { prompt } = await req.json();

    // Call AI model with the prompt
    const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);

    // Ensure we correctly await the response text
    const aiResponse = await result.response.text();

    console.log("AI Response:", aiResponse);

    // Save AI-generated response to the database (you need to implement this)
    // Example: await saveEmailTemplateToDB({ userEmail, tempId, aiResponse });

    // Return a successful response
    return NextResponse.json(JSON.parse(aiResponse));
  } catch (error) {
    console.error("Error generating email template:", error);

    // Return an error response
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }
}
