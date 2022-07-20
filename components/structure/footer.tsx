import ReturnToTopButton from "../navigation/returnToTopButton";
import GithubLink from "./githubLink";

const Footer = () => {
  return (
    <footer className="shadow text-slate-500 font-mono h-8 text-xs bg-slate-50 flex items-center justify-center fixed bottom-0 w-full space-x-8">
      <ReturnToTopButton />
      <GithubLink href='https://github.com/HackerNews/API' text="API" />
      <span className="select-none hidden sm:inline">🔸</span>
      <p>Made with 🧡 by <a className="bg-indigo-100 hover:bg-indigo-200 hover:shadow-inner text-indigo-500 px-2 rounded-full duration-75" href="https://www.danblack.co" target="_blank" rel="norefferer">Dan</a></p>
      <span className="select-none hidden sm:inline">🔸</span>
      <a className="hidden sm:inline text-[#ff6600] bg-[#f8caab] rounded-full px-2 hover:shadow-inner hover:bg-[#f7be98] duration-75" href="http://news.ycombinator.com" target="_blank" rel="norefferer">Hacker News</a>
      
    </footer>
  );
}

export default Footer;