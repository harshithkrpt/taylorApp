import React from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import SignOut from "../Auth/SignOut";
import styled from "styled-components";

const NavBarStyle = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background-color: rgb(143, 143, 143);
`;

export default function NavBar() {
  const { isLogin } = useAuthValue();

  return (
    <NavBarStyle>
      <ul>
        {isLogin ? (
          <>
            <li>
              <Link to="/add_blouse">ADD BLOUSE </Link>
            </li>
            <li>
              <Link to="/display_blouses">DISPLAY BLOUSES</Link>
            </li>
            <li>
              <Link to="/add_customer">Add Customer</Link>
            </li>
            <li>
              <Link to="/display_customers">Display Customers</Link>
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
    </NavBarStyle>
  );
}
