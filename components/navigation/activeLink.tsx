import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { useState, useEffect, ReactElement, Children } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) => {
  const { asPath, isReady } = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className || "";
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    // check if router fields are updated client side
    if (isReady) {
      // Dynamic routes will be matched via props.as
      // Static routes will be matched via props.href
      const linkPathName = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathName = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathName === activePathName
          ? `${childClassName} ${activeClassName}`.trim()
          : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    className,
  ]);

  return (
    <Link legacyBehavior {...props}>
      {React.cloneElement(child, { className: className || null })}
    </Link>
  );
};

export default ActiveLink;
