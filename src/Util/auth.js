import { redirect } from "react-router-dom";

export function CheckAuthLoader() {
  const token = localStorage.getItem("isLogin");
  console.log(token);
  if (!token) {
    return redirect("/");
  } else {
    return null;
  }
  return null;
}
