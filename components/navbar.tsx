import ActiveLink from "./activeLink";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 flex justify-between items-center px-4 md:24 lg:px-32 sm:text-xl md:text-2xl font-mono h-12 sm:h-16 md:h-20 shadow">
      
      <ActiveLink activeClassName='active' href='/'>
        <a className="font-bold">Hacker News Client</a>
      </ActiveLink>

      <ul className="flex space-x-2 sm:space-x-3 md:space-x-6">
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
    </nav>
  );
}

export default Navbar;