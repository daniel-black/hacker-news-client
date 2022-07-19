import Image from "next/image";

type GithubLinkProps = { href: string, text: string };

const GithubLink = ({ href, text }: GithubLinkProps) => (
    <a href={href} target='_blank' rel="noreferrer" className='hidden relative sm:flex items-end text-xs bg-slate-200 hover:bg-slate-300 text-[#211f1f] hover:shadow-inner px-2 rounded-full duration-75'>
      <Image src='/logo-github.svg' alt='Github Icon' height='16' width='16' />
      <span className="ml-1 font-mono">{text}</span>
    </a>
  );

export default GithubLink;