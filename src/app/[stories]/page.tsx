import { NAV_PATHS } from "@/constants";
// import { getItemIds } from "@/utils/items";
import { notFound } from "next/navigation";

type StoriesPageProps = {
  params: {
    stories: string;
  };
};

export default async function StoriesPage({
  params: { stories },
}: StoriesPageProps) {
  if (!NAV_PATHS.some((np) => np === stories)) {
    notFound();
  }
  const needsSuffix = stories === "ask" || stories === "show";

  // const itemIds = await getItemIds();

  return (
    <div>
      <h1 className="capitalize font-bold">
        {stories}
        {needsSuffix ? " HN" : null}
      </h1>
      <p>{stories}</p>
    </div>
  );
}
