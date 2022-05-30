import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default ()=>{
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    let [token, setToken] = useState(null)

    useEffect(()=>{
        if(!isLoading && isAuthenticated && !token){
            getAccessTokenSilently().then(t=>{
                setToken(t)
            })
        }
    }, [isAuthenticated, isLoading])

    return token;
}