import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { prompt, currentPresentation, action } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    let systemPrompt = "";

    if (action === "edit" && currentPresentation) {
      systemPrompt = `You are a PowerPoint presentation editor. The user wants to edit an existing presentation.

Current presentation:
${JSON.stringify(currentPresentation, null, 2)}

User's edit request: ${prompt}

Please update the presentation based on the user's request and return the COMPLETE updated presentation in JSON format.

Return ONLY a valid JSON object with this structure:
{
  "title": "Presentation Title",
  "slides": [
    {
      "id": "unique-id",
      "title": "Slide Title",
      "content": ["Bullet point 1", "Bullet point 2"],
      "layout": "title" | "content" | "image-content",
      "backgroundColor": "FFFFFF"
    }
  ]
}

Important:
- Maintain the same slide IDs unless creating new slides
- Apply the requested changes
- Keep the JSON structure intact
- Return ONLY the JSON object, no additional text`;
    } else {
      systemPrompt = `You are a PowerPoint presentation generator. Create a professional presentation based on the user's topic.

User's request: ${prompt}

Generate a complete presentation with multiple slides (typically 5-8 slides) covering the topic comprehensively.

Return ONLY a valid JSON object with this structure:
{
  "title": "Presentation Title",
  "slides": [
    {
      "id": "slide-1",
      "title": "Slide Title",
      "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
      "layout": "title" | "content" | "image-content",
      "backgroundColor": "FFFFFF"
    }
  ]
}

Guidelines:
- First slide should use "title" layout with presentation title and subtitle
- Other slides should use "content" layout
- Each content slide should have 3-5 bullet points
- Make content informative and well-structured
- Use professional language
- Return ONLY the JSON object, no additional text or markdown`;
    }

    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from the response
    let jsonText = text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const presentation = JSON.parse(jsonText);

    return NextResponse.json({ presentation });
  } catch (error) {
    console.error("Error generating presentation:", error);
    return NextResponse.json(
      { error: "Failed to generate presentation. Please try again." },
      { status: 500 }
    );
  }
}
