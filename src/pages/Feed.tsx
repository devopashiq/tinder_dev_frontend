import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../utils/store";
import { BASE_URL } from "../utils/constans";
import axios from "axios";
import { useEffect } from "react";
import { setFeed, removeFeed } from "../utils/feedSlice";
import { AnimatePresence } from "framer-motion";
import FeedCard from "../components/FeedCard";

function Feed() {
  const feed = useSelector((state: RootState) => state.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(setFeed(res.data?.users));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  async function handleFeedActions(action: string, userId: string) {
    try {
      // Remove from UI immediately for snappy feel
      dispatch(removeFeed(userId));

      await axios.post(
        `${BASE_URL}/request/send/${action}/${userId}`,
        {},
        { withCredentials: true }
      );

      // Refill if getting low
      if (feed.length <= 2) {
        fetchFeed();
      }
    } catch (err) {
      console.error("Action failed:", err);
    }
  }

  useEffect(() => {
    if (!feed || feed.length === 0) {
      fetchFeed();
    }
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-semibold text-center mt-4">
          No more profiles to show! Check back later.
        </h1>
        <button onClick={fetchFeed} className="btn btn-primary mt-4">Refresh</button>
      </div>
    );
  }

  return (
    <div className="h-[80vh] flex justify-center items-center overflow-hidden">
      <AnimatePresence>
        <FeedCard
          key={feed[0]._id} // Forces re-render of swipe logic for new user
          user={feed[0]}
          handleAction={handleFeedActions}
        />
      </AnimatePresence>
    </div>
  );
}

export default Feed;