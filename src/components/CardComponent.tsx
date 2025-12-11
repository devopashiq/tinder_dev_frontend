import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { UserState } from "../utils/userSlice";

interface CardProps {
  user: Partial<UserState> | null;
  handleAction?: (action: string, userId: string) => void;
}

function CardComponent({ user ,handleAction}:CardProps) {
  if (!user) return null;

  function handleClick(action:string,id:string){
      if (!id || !handleAction) return;
    handleAction(action,id)

  }

  const { _id,firstName, age, photoUrl, about, gender } = user;

  return (
    <div className="card relative w-96 m-auto h-full  rounded-2xl overflow-hidden shadow-lg">
      {/* Image */}
      <img
        src={photoUrl || "/placeholder.jpg"}
        alt={`${firstName}'s profile`}
        className="w-full h-full object-cover"
      />

      {/* Overlay Gradient - removed rounded-2xl */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Card Content - removed rounded-b-2xl */}
      <div className="absolute bottom-0 w-full p-4 text-white">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          {firstName}
        </h2>
      
        <p className="text-sm mb-3 opacity-80"><span className="text-lg font-normal">{age? age +',': ''}</span>
          <span className="text-sm opacity-70 capitalize">{gender}</span></p>
        <p className="text-sm mb-3 opacity-80">{about}</p>

        <div className="flex justify-center gap-8 mt-3">
          <button className="btn btn-circle bg-white border-none shadow-md hover:bg-gray-200 w-14 h-14 flex items-center justify-center" onClick={()=>handleClick('ignored',_id!)}>
            <FontAwesomeIcon icon={faXmark} className="text-pink-600 text-3xl" />
          </button>

          <button className="btn btn-circle bg-white border-none shadow-md hover:bg-gray-200 w-14 h-14 flex items-center justify-center" onClick={()=>handleClick('interested',_id!)}>
            <FontAwesomeIcon icon={faHeart} className="text-green-600 text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
