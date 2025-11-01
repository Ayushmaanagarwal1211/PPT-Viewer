export interface Slide {
  id: string;
  title: string;
  content: string[];
  imageUrl?: string;
  layout?: "title" | "content" | "image-content" | "two-column";
  backgroundColor?: string;
}

export interface Presentation {
  title: string;
  slides: Slide[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ThoughtStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}
