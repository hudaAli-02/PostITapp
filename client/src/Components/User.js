
import user from "../Images/user.png";
import { useSelector } from "react-redux";
import Location from "../Location";
const User = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  const user = useSelector((state) => state.users.user);
  const picURL = "http://localhost:3001/uploads/" + user.profilePic;
  return (
    <div>
      <img src={picURL} className="userImage"/>
      <p>
        {name}
        <br/>
        {email}
        <Location/>
      </p>
      
    </div>
  );
};

export default User;
