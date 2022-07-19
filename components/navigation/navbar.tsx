import ActiveLink from "./activeLink";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 flex justify-center items-center h-12 sm:h-16 md:h-20 shadow">
      <div className="cont sm:text-xl md:text-2xl font-mono flex justify-between">
        <ActiveLink activeClassName='active' href='/'>
          <a className="font-bold">HN Reader</a>
        </ActiveLink>

        <ul className="flex space-x-3">
          <li>
            <ActiveLink activeClassName='active' href='/stories/top'>
              <a className="hover:bg-slate-200 hover:shadow px-2 sm:px-3 md:px-4 py-1 rounded-full duration-75">
                <span className="hidden sm:inline">🔥</span>Top
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName='active' href='/stories/best'>
              <a className="hover:bg-slate-200 hover:shadow px-2 sm:px-3 md:px-4 py-1 rounded-full duration-75">
                <span className="hidden sm:inline">🔼</span>Best
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName='active' href='/stories/new'>
              <a className="hover:bg-slate-200 hover:shadow px-2 sm:px-3 md:px-4 py-1 rounded-full duration-75">
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