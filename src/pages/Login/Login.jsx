import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";


export default ()=>{
    const { loginWithRedirect } = useAuth0();
    return (
        <div style={{textAlign: "center"}}>
            <Button onClick={() => loginWithRedirect()}>Login</Button>
        </div>
    );

}