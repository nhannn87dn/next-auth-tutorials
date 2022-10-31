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
    isLogout: (path : string) => void
}


type TypeProps = {
    staticProps: any,
    children: ReactNode
}

export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    isLoading: false,
    isLogout: () => {},
});
const { Provider } = AuthContext;

export const useAuth = () => useContext(AuthContext);

  
export const AuthProvider = ({ staticProps, children }: TypeProps) => {
    const router = useRouter();
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isLoading , setIsLoading] = useState(false);

    const local_key = "accessToken";
    console.log("2.AuthProvider",staticProps)  

    useEffect(() => {
        const fetchUser = async() =>{
            setIsLoading(true)
                const accessToken =  localStorage.getItem(local_key);
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
                        localStorage.removeItem(local_key);
                        router.replace("/login")
                    }
                }else{
                    //setUser(null)
                    router.replace("/login")
                }
        }
        if(staticProps.protected) fetchUser();
    },[router,staticProps])



    const isLogout = useCallback((path: string) => {
        setUser(prev=>prev = null);
        localStorage.removeItem(local_key);
        router.push(path as string | "/")
    }, [router]);
    
    const contextValue: AuthContextInterface = useMemo(() => ({
        user,
        isLoading,
        isLogout
    }), [user, isLoading, isLogout]);

    console.log("2.5.AuthProvider",user)  

    return <Provider value={contextValue}>{children}</Provider>;
};
