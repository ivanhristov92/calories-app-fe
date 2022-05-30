import InviteAFriendDialog from "../invite-a-friend/InviteAFriend";
import { useLocation } from "react-router-dom"


export default ()=>{
    let loc = useLocation();
    let isAdminSection = loc.pathname.match(/admin/);

    return (
        <div className="footer">
            {!isAdminSection && (
            <InviteAFriendDialog />
            )}
        </div> 
    );
}