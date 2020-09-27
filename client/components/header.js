import NextLink from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <NextLink href={href}>
          <a className="nav-link"> {label}</a>
        </NextLink>
      </li>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <NextLink href="/">
        <a className="navbar-brand">GitTix</a>
      </NextLink>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
