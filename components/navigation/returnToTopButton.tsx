import Link from "next/link";
import { useRouter } from "next/router";

const ReturnToTopButton = () => {
  const { pathname } = useRouter();

  return (
    <Link href={`${pathname}#top`}>
      <button className="return-to-top-btn">
        🔝
      </button>
    </Link>
  )
}

export default ReturnToTopButton;