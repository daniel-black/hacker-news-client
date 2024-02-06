import { Suspense } from "react";
import { LayoutProps } from "../layout";

export default function StoriesLayout({ children }: LayoutProps) {
  return (
    <div className="px-10 py-5">
      <Suspense fallback={"loading..."}>{children}</Suspense>
    </div>
  );
}
