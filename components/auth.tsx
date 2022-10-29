import { createContext, useContext } from "react";
import { ReactNode, useEffect,useState , useCallback,useMemo} from "react";
import {useRouter} from "next/router";
import {verifyToken} from "../lib/auth"


interface UserInterface  {
    name: string,
    token?: string,
    role?: string,
    isAuthenticated: boolean,
    isAuthorized?: boolean
}

interface AuthContextInterface {
    user: UserInterface | null,
    isLoading : boolean,
    Logout?: () => void
}


type TypeProps = {
    staticProps: any,
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextInterface);
const { Provider } = AuthContext;

export const useAuth = () => {
  const auth = useContext(AuthContext)
  return {auth}
}

  
export const AuthProvider = ({ staticProps, children }: TypeProps) => {
    const router = useRouter();
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isLoading , setIsLoading] = useState(false);

    console.log("2.AuthProvider",staticProps)  

    useEffect(() => {
        const fetchUser = async() =>{
            setIsLoading(true)
                const accessToken =  localStorage.getItem("accessToken");
                console.log("2.0.AuthProvider",accessToken) 
                if(accessToken){
                    console.log("2.1.AuthProvider",accessToken)  
                    const reslut = await verifyToken();
                    // if token was verified we set the state.
                    if (reslut.isAuthenticated) {
                        
                        if (staticProps.allowRoles &&
                            staticProps.allowRoles.indexOf(reslut.role) === -1
                        )
                        {
                            setUser(prev=> prev = {...reslut,isAuthorized: false});
                            router.replace("/deny")
                        }else{
                            console.log("2.2.AuthProvider",reslut)  
                            setUser(prev=> prev = {...reslut,isAuthorized: true});
                        }
                        setIsLoading(false);
                        
                    } else {
                        //setUser(null)
                        localStorage.removeItem("accessToken");
                        router.replace("/login")
                    }
                }else{
                    //setUser(null)
                    router.replace("/login")
                }
        }
        if(staticProps.protected) fetchUser();
    },[router,staticProps])

    // const Logout = ()=> {{
    //     setUser(prev=>prev = null)
    // }}
    

    const Logout = useCallback(() => {
        setUser(prev=>prev = null)
      }, []);
    
      const contextValue: AuthContextInterface = useMemo(() => ({
        user,
        isLoading,
        Logout
      }), [user, isLoading, Logout]);

    console.log("2.5.AuthProvider",user)  

    return <Provider value={contextValue}>{children}</Provider>;
};
