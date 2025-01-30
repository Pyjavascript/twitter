import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Customlink({ children, to, ...props }) {
  let resolvedPath = useResolvedPath(to); // Corrected hook name
  let isMatch = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <div>
      <Link
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

export default Customlink;
