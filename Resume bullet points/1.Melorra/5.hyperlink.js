/*
 Unified Hyperlink Strategy

 - A centralized approach to handle all links in an application
 - Instead of using multiple link types (<a>, router links, etc.),
   we create a single reusable link component

 Why we use it:
 - Ensures consistent navigation behavior across the app
 - Improves SEO by properly handling internal links
 - Enables client-side routing (avoids full page reloads)
 - Handles external links securely (target="_blank", rel="noopener")
 - Allows adding tracking/analytics in one place

 What it includes:
 - Internal links → handled via router (Next.js / React Router)
 - External links → open in new tab with proper security attributes
 - Conditional logic → detect internal vs external URLs

 Example logic:
 if (internal link) → use router navigation
 if (external link) → use <a> tag with target="_blank"

 Benefits:
 - Cleaner codebase
 - Easier maintenance
 - Better performance and user experience

 instad
 <a href="/about">About</a>
<Link to="/about">About</Link>
<a href="https://external.com" target="_blank">External</a>


we do:-

<CustomLink href="/about">About</CustomLink>
<CustomLink href="https://external.com">External</CustomLink>


import Link from "next/link";

const isExternal = (url) => {
  return url.startsWith("http") || url.startsWith("mailto:");
};

const CustomLink = ({
  href,
  children,
  className = "",
  target,
  rel,
  onClick,
  ...props
}) => {

  // External link
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link (Next.js routing)
  return (
    <Link href={href} passHref>
      <a className={className} onClick={onClick} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default CustomLink;
 */
