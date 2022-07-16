import { useRouter } from "next/router";
import ActiveLink from "./activeLink";

const Navbar = () => {
  const router = useRouter();
  

  return (
    <nav className="flex justify-between px-10">
      
      <ActiveLink activeClassName='active' href='/'>
        <a>Hacker News Client</a>
      </ActiveLink>

      <ul className="flex space-x-6">
        <li>
          <ActiveLink activeClassName='active' href='/stories/best'>
            <a>Best</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName='active' href='/stories/top'>
            <a>Top</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName='active' href='/stories/new'>
            <a>New</a>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;