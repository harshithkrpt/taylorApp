import React from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import SignOut from "../Auth/SignOut";

export default function NavBar() {
  const { isLogin } = useAuthValue();
  return (
    <div>
      <ul>
        {isLogin ? (
          <>
            <li>
              <Link to="/add_blouse">ADD BLOUSE </Link>
            </li>
            <li>
              <Link to="/display_blouses">DISPLAY BLOUSES</Link>
            </li>
            <SignOut />
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">SignIn</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
