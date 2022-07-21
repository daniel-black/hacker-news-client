import ActiveLink from "./activeLink";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 flex justify-center items-center h-12 sm:h-16 md:h-20 shadow">
      <div className="cont sm:text-xl md:text-2xl font-mono flex justify-between relative">
        <img 
          src="/big-highlight.png" alt="highlight" 
          className=" absolute z-10 sm:z-10 md:z-10 scale-[36%] -translate-x-[68px] -translate-y-7 sm:scale-[44%] sm:-translate-x-[61px] sm:-translate-y-[25px] md:scale-[54%] md:-translate-x-[52px] md:-translate-y-[24px]" />
        <ActiveLink activeClassName='' href='/'>
          <a className="z-20 font-sans font-bold italic text-amber-800 hover:text-amber-700 duration-100 ease-in-out">Hacolyte</a>
        </ActiveLink>

        <ul className="flex space-x-3">
          <li>
            <ActiveLink activeClassName='active' href='/stories/top'>
              <a className="hover:bg-slate-200 hover:shadow px-2 sm:px-3 py-1 rounded-full duration-100">
                <span className="hidden sm:inline">🔥</span>Top
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName='active' href='/stories/best'>
              <a className="hover:bg-slate-200 hover:shadow px-2 sm:px-3 py-1 rounded-full duration-100">
                <span className="hidden sm:inline">🔼</span>Best
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName='active' href='/stories/new'>
              <a className="hover:bg-slate-200 hover:shadow px-2 sm:px-3 py-1 rounded-full duration-100">
                <span className="hidden sm:inline">❇️</span>New
              </a>
            </ActiveLink>
          </li>
        </ul>
      </div>      
    </nav>
  );
}

export default Navbar;