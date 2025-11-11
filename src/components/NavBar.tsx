import { useSelector } from "react-redux";
import type { RootState } from "../utils/store";


function Navbar() {

  const  user = useSelector((state:RootState)=>state.user)
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 mx-3">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      <div className="flex-none">

        {user &&  <div className="dropdown dropdown-end flex items-center">
          <p>{user.firstName}</p>
        
              
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mx-3 bg-red-400"
          >


            <div className="w-10 rounded-full flex gap-2">
               <img
                  alt={`${user.firstName}'s avatar`}
                  src={user.image || "https://via.placeholder.com/150"}
                />
            </div>

          </div>

           <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
        </div>}
      
      </div>
    </div>
  );
}

export default Navbar;
