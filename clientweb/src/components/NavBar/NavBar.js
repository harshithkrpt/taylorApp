import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/add_blouse">ADD BLOUSE </Link>
        </li>
        <li>
          <Link to="/display_blouses">DISPLAY BLOUSES</Link>
        </li>
      </ul>
    </div>
  );
}
