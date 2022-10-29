import Link from "next/link";
import { useAuth } from './auth';
import {useRouter} from "next/router";

export const Nav = () => {
  const {auth} = useAuth();
  const router = useRouter();

  console.log(auth)
  const handleLogout = () => {
    if(auth?.Logout) {
        auth.Logout();
    } 
    localStorage.removeItem("accessToken");
    router.push("/login")
  }
  return (
    <nav className="nav">
      <ul className="flex p-6 bg-gray-100">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/dashboard">Admin</Link>
        </li>
        <li>
        <Link href="/me">Me</Link>
        </li>
        {!auth.isLoading && auth?.user ? (
           <li>{auth.user.name} | <span onClick={handleLogout}>Lougout</span></li>
          
        )
        : (
          <Link href="/login">Login</Link>
        )
      }
      </ul>
    </nav>
  );
};
