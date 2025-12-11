import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/store";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constans";
import axios from "axios";
import { addRequest ,removeRequest} from "../utils/requestSlice";

export default function Request() {
  const request = useSelector((state: RootState) => state.request);
  const dispatch = useDispatch();

  async function handleRequest(requestId: string, status: string) {
   try{
       const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`,{}, { withCredentials: true });
    
    console.log(res);

    dispatch(removeRequest(requestId));
    

   }catch(err){
    console.log(err);
    


   }

 
    
    
  }

  useEffect(() => {
    async function fetchRequest() {
      try {
        if (request) return;

        const res = await axios.get(`${BASE_URL}/user/request/received`, {
          withCredentials: true,
        });
        console.log(res);

        dispatch(addRequest(res.data.data));
      } catch (err) {
        console.log(err);
      }
    }

    fetchRequest();
  }, [handleRequest]);

  if (!request || request?.length === 0)
    return (
      <h1 className="text-2xl font-semibold text-center mt-4">
        No Requests Received
      </h1>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Requests</h1>

      <div className="grid grid-cols-1 gap-4">
        {request.map((item) => (
          <div
            key={item.fromUserId._id}
            className="flex items-center gap-4 bg-base-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={item.fromUserId.photoUrl}
              alt={`${item.firstName}'s profile`}
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div className="space-y-1 flex justify-between w-full">
              <div>
                <p className="text-lg font-semibold">
                  {item.fromUserId.firstName} {item.fromUserId.lastName}
                </p>

                <p className="text-sm text-gray-600">
                  {item.fromUserId.age} • {item.fromUserId.gender}
                </p>

                <p className="text-sm">{item.fromUserId.about}</p>
              </div>
            </div>
            <div className="flex
            gap-3">
              <button className="btn btn-primary"
              onClick={()=>handleRequest(item._id,"rejected")}>Reject</button>
              <button className="btn btn-secondary" onClick={()=>handleRequest(item._id,"accepted")}>Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
