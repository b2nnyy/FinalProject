import { readPdf, readTransformation } from "@/lib/content";
import EssayLayout from "@/components/EssayLayout";
import TransformationSidebar from "@/components/TransformationSidebar";

export default async function DestinationPage() {
  const paragraphs = await readPdf(
    "Destination/Destination_Revised_BenInglee.pdf",
    true
  );
  const items = await readTransformation(
    "Transformations/destination transformation.docx"
  );

  return (
    <EssayLayout
      pageHeading="Destination"
      essayLabel="Essay"
      essayTitle="Destination"
      paragraphs={paragraphs}
      sidebar={
        <TransformationSidebar
          title="Sidebar — What I Wish I Knew Before Moving to Philadelphia"
          items={items}
        />
      }
    />
  );
}
