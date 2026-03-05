import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constans";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utils/store";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

export default function Connection() {
  const connection = useSelector((state: RootState) => state.connection);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  async function fetchConnection() {
    try {
      const res = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchConnection();
  }, [dispatch]);

  if (!connection || connection.length === 0)
    return (
      <h1 className="text-2xl font-semibold text-center mt-4">
        No connections
      </h1>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Connections</h1>

      <div className="grid grid-cols-1 gap-4 ">
        {connection.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-base-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.photoUrl}
                alt={`${item.firstName}'s profile`}
                className="w-20 h-20 rounded-full object-cover border"
              />

              <div className="space-y-1">
                <p className="text-lg font-semibold">
                  {item.firstName} {item.lastName}
                </p>

                <p className="text-sm text-gray-600">
                  {item.age} • {item.gender}
                </p>

                <p className="text-sm">{item.about}</p>
              </div>
            </div>
            {user?.isPremium && (
              <div>
                <Link to={"/chat/" + item._id}>
                  <button className="btn btn-primary btn-sm">Message</button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
