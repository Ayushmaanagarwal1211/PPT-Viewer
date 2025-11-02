import PptxGenJS from "pptxgenjs";
import { Presentation } from "@/types";

export function generatePPT(presentation: Presentation): PptxGenJS {
  const pptx = new PptxGenJS();

  presentation.slides.forEach((slide, index) => {
    const pptSlide = pptx.addSlide();

    if (slide.backgroundColor) {
      pptSlide.background = { color: slide.backgroundColor };
    } else {
      pptSlide.background = { color: "FFFFFF" };
    }

    if (index === 0 || slide.layout === "title") {
      pptSlide.addText(slide.title, {
        x: 0.5,
        y: 2.5,
        w: 9,
        h: 1.5,
        fontSize: 44,
        bold: true,
        color: "363636",
        align: "center",
      });

      if (slide.content.length > 0) {
        pptSlide.addText(slide.content[0], {
          x: 0.5,
          y: 4.5,
          w: 9,
          h: 0.8,
          fontSize: 20,
          color: "666666",
          align: "center",
        });
      }
    } else if (slide.layout === "image-content") {
      pptSlide.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.8,
        fontSize: 32,
        bold: true,
        color: "363636",
      });

      if (slide.imageUrl) {
        pptSlide.addImage({
          path: slide.imageUrl,
          x: 0.5,
          y: 1.5,
          w: 4,
          h: 3,
        });
      }

      const contentText = slide.content.join("\n");
      pptSlide.addText(contentText, {
        x: 5,
        y: 1.5,
        w: 4.5,
        h: 3,
        fontSize: 16,
        color: "363636",
        bullet: true,
      });
    } else {
      pptSlide.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.8,
        fontSize: 32,
        bold: true,
        color: "363636",
      });

      const contentText = slide.content.join("\n");
      pptSlide.addText(contentText, {
        x: 0.5,
        y: 1.5,
        w: 9,
        h: 4,
        fontSize: 18,
        color: "363636",
        bullet: true,
      });
    }
  });

  return pptx;
}

export async function downloadPPT(presentation: Presentation) {
  const pptx = generatePPT(presentation);
  const fileName = `${presentation.title.replace(/[^a-z0-9]/gi, "_")}.pptx`;
  await pptx.writeFile({ fileName });
}
