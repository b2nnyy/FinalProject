import { readDocx, readTransformation } from "@/lib/content";
import EssayLayout from "@/components/EssayLayout";
import TransformationSidebar from "@/components/TransformationSidebar";

export default async function HomePage() {
  const paragraphs = await readDocx(
    "Home/Revised - HOME Ben Inglee (1).docx",
    true
  );
  const items = await readTransformation(
    "Transformations/home transformation.docx"
  );

  return (
    <EssayLayout
      pageHeading="Home"
      essayLabel="Essay"
      essayTitle="Home"
      paragraphs={paragraphs}
      sidebar={
        <TransformationSidebar
          title="Sidebar — 7 Things That Make Albany Feel Like Home"
          items={items}
        />
      }
      sourcesAnchor="home"
    />
  );
}
