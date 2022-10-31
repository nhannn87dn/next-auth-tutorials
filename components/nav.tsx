import Link from "next/link";
import { useAuth } from './auth';

export const Nav = () => {
  const {isLoading,user,isLogout} = useAuth();

  //console.log(auth)
  const handleLogout = () => {
    if(user && user.isAuthenticated){
      isLogout("/login");
    }
   
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
        {!isLoading && user !== null ?(
           <li>{user.name} | <span onClick={handleLogout}>Lougout</span></li>
          
        )
        : (
          <Link href="/login">Login</Link>
        )
      }
      </ul>
    </nav>
  );
};
