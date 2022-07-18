
const Footer = () => {
  return (
    <footer className="shadow text-slate-500 font-mono h-8 text-xs bg-slate-50 flex items-center justify-center fixed bottom-0 w-full space-x-8">
      <a className="text-[#ff6600] bg-[#f8caab] rounded-full px-2 hover:shadow-inner hover:bg-[#f7be98] duration-75" href="http://news.ycombinator.com" target="_blank" rel="norefferer">Hacker News</a>
      <span className="select-none hidden sm:inline">🔸🔶🔸</span>
      <span className="select-none sm:hidden inline">|</span>
      <p>Made with 🧡 by <a className="bg-indigo-100 hover:bg-indigo-200 hover:shadow-inner text-indigo-500 px-2 rounded-full duration-75" href="https://www.danblack.co" target="_blank" rel="norefferer">Dan</a></p>
    </footer>
  );
}

export default Footer;