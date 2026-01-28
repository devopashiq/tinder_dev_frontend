import { useSelector, useDispatch } from "react-redux";
import CardComponent from "../components/CardComponent";
import type { RootState } from "../utils/store";
import { BASE_URL } from "../utils/constans";
import axios from "axios";
import { useEffect } from "react";
import { setFeed, removeFeed } from "../utils/feedSlice";

function Feed() {
  const feed = useSelector((state: RootState) => state.feed);
  const dispatch = useDispatch();

  async function handleFeedActions(action: string, userId: string) {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${action}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(res);

      dispatch(removeFeed(userId));
      if (feed.length <= 2) {
        fetchFeed();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchFeed() {
    try {
      const res = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });

      dispatch(setFeed(res.data?.users));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (feed?.length > 0) return;
    fetchFeed();
  }, []);

  // useEffect(() => {
  //   if(feed.length <2){
  //       fetchFeed()
  //   }

  // }, [feed.length]);

  if (feed.length == 0) {
    return (
      <>
        <h1 className="text-2xl font-semibold text-center mt-4">
          No More New User Are here....
        </h1>
      </>
    );
  }

  return (
    <div className="h-[75vh] mt-4">
      {feed?.length &&
        
          <CardComponent
            key={feed[0]._id}
            user={feed[0]}
            handleAction={handleFeedActions}
          ></CardComponent>
      }
      {/* {feed?.length &&
        feed.map((user) => (
          <CardComponent
            key={user._id}
            user={user}
            handleAction={handleFeedActions}
          ></CardComponent>
        ))} */}
    </div>
  );
}

export default Feed;
