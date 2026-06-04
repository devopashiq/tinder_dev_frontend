import { motion, useMotionValue, useTransform } from "framer-motion";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  user: any;
  handleAction: (action: string, userId: string) => void;
}

const FeedCard = ({ user, handleAction }: CardProps) => {
  const x = useMotionValue(0);

  // 1. Map drag to rotation and opacity
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // 2. Control "Like/Nope" stamp visibility
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 120; // Slightly lower threshold for better UX
    if (info.offset.x > threshold) {
      handleAction("interested", user._id);
    } else if (info.offset.x < -threshold) {
      handleAction("ignored", user._id);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-full w-full overflow-hidden">
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
        className="absolute w-[95%] max-w-[380px] h-[550px] bg-neutral rounded-3xl shadow-2xl cursor-grab overflow-hidden border border-gray-700 select-none"
      >
        {/* --- SWIPE STAMPS --- */}
        <motion.div 
          style={{ opacity: likeOpacity }} 
          className="absolute top-12 left-8 z-20 border-4 border-green-500 text-green-500 font-black text-4xl px-4 py-1 rounded-lg uppercase -rotate-12"
        >
          Like
        </motion.div>
        <motion.div 
          style={{ opacity: nopeOpacity }} 
          className="absolute top-12 right-8 z-20 border-4 border-red-500 text-red-500 font-black text-4xl px-4 py-1 rounded-lg uppercase rotate-12"
        >
          Nope
        </motion.div>

        {/* --- PHOTO --- */}
        <div className="h-full w-full relative">
          <img
            src={user.photoUrl || "https://via.placeholder.com/400x600"}
            alt={`${user.firstName}'s photo`}
            className="w-full h-full object-cover pointer-events-none"
          />
          
          {/* --- GRADIENT OVERLAY --- */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* --- INFO & BUTTONS --- */}
        <div className="absolute bottom-0 w-full p-6 space-y-4">
          <div className="text-white">
            <h2 className="text-3xl font-extrabold">
              {user.firstName} {user.lastName}{user.age ? `, ${user.age}` : ""}
            </h2>
            <p className="text-gray-300 mt-1 line-clamp-2 text-sm leading-relaxed">
              {user.about || "No bio available."}
            </p>
          </div>

          <div className="flex justify-center gap-6 pb-2">
            {/* Ignore Button */}
            <button 
              className="btn btn-circle bg-white border-none shadow-xl hover:bg-red-50 hover:scale-110 transition-transform w-14 h-14"
              onClick={(e) => {
                e.stopPropagation(); // Prevents drag interference
                handleAction('ignored', user._id);
              }}
            >
              <FontAwesomeIcon icon={faXmark} className="text-red-500 text-2xl" />
            </button>

            {/* Like Button */}
            <button 
              className="btn btn-circle bg-white border-none shadow-xl hover:bg-green-50 hover:scale-110 transition-transform w-14 h-14"
              onClick={(e) => {
                e.stopPropagation();
                handleAction('interested', user._id);
              }}
            >
              <FontAwesomeIcon icon={faHeart} className="text-green-500 text-2xl" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedCard;