import { getAccessToken } from "../context/accessToken";
import jwtDecode from "jwt-decode";

export const getUserId = () => {
  const token = getAccessToken();
  if (token !== "") {
    const { userId } = jwtDecode(token);

    return userId;
  }
};
