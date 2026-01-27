import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constans";
import { removeUser } from "../utils/userSlice";
import { useEffect } from "react";


function Navbar() {
  const navigate=useNavigate();
   const  user = useSelector((state:RootState)=>state.user);
   const dispatch = useDispatch();

  const handleLogout = async () => {
  try {
    const res = await axios.post(BASE_URL + '/logout',{} ,{ withCredentials: true });
    console.log('logout response', res);
    console.log('before dispatch user=', user);
    dispatch(removeUser());
    console.log('after dispatch user (local var still stale) — check selector via effect');

    // navigate after logout if needed
    navigate('/home', { state: { openLogin: true } });
  } catch (err) {
    console.log(err);
      if (axios.isAxiosError(err)) {
        alert(err?.response?.data || err.message);
      } else if (err instanceof Error) {
        alert(err.message);
      } else { 
        alert("Unexpected error occurred");
      }
  }
};

// in component to watch changes
useEffect(() => {
  console.log('user slice changed:', user);
}, [user]);



  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 mx-3">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      <div className="flex-none">

        {user &&  <div className="dropdown dropdown-end flex items-center dropdown-bottom">
          <p>{user.firstName}</p>
        
              
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mx-3 "
          >


            <div className="w-10 rounded-full flex gap-2">
               <img
                  alt={`${user.firstName}'s avatar`}
                  src={user.photoUrl || "https://via.placeholder.com/150"}
                />
            </div>

          </div>
          

           <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>

          <Link to={'/Profile'}>Profile</Link>
        </li>
        <li>

          <Link to={'/'}>Feed</Link>
        </li>
        
        <li>

          <Link to={'/premium'}>Premium</Link>
        </li>
        
       
        <li> <Link to={'/connections'}>Connections</Link></li>
        <li> <Link to={'/requests'}>Requests</Link></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
        </div>}
      
      </div>
    </div>
  );
}

export default Navbar;
