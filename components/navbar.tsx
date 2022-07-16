import ActiveLink from "./activeLink";

const Navbar = () => {
  return (
    <nav className="bg-slate-50 flex justify-between items-center px-32 text-2xl font-mono h-20 shadow">
      
      <ActiveLink activeClassName='active' href='/'>
        <a className="font-bold">Hacker News Client</a>
      </ActiveLink>

      <ul className="flex space-x-6">
        <li>
          <ActiveLink activeClassName='active' href='/stories/best'>
            <a className="hover:bg-slate-200 hover:shadow px-4 py-1 rounded-full duration-75">Best</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName='active' href='/stories/top'>
            <a className="hover:bg-slate-200 hover:shadow px-4 py-1 rounded-full duration-75">Top</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName='active' href='/stories/new'>
            <a className="hover:bg-slate-200 hover:shadow px-4 py-1 rounded-full duration-75">New</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;