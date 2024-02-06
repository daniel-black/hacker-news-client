import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-20 space-y-5">
      <h1 className="text-3xl">Page not found!</h1>
      <p>Come see what people are talking about on Hacker News.</p>
      <div className="grid grid-rows-3 grid-cols-2 gap-4">
        <Link
          href="/best"
          className="rounded-lg h-20 flex justify-center items-center text-2xl border"
        >
          Best
        </Link>
        <Link
          href="/top"
          className="rounded-lg h-20 flex justify-center items-center text-2xl border"
        >
          Top
        </Link>
        <Link
          href="/new"
          className="rounded-lg h-20 flex justify-center items-center text-2xl border"
        >
          New
        </Link>
        <Link
          href="/jobs"
          className="rounded-lg h-20 flex justify-center items-center text-2xl border"
        >
          Jobs
        </Link>
        <Link
          href="/show"
          className="rounded-lg h-20 flex justify-center items-center text-2xl border"
        >
          Show HN
        </Link>
        <Link
          href="/ask"
          className="rounded-lg h-20 flex justify-center items-center text-2xl border"
        >
          Ask HN
        </Link>
      </div>
    </div>
  );
}
