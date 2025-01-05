import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';


const FeedCard = ({ feedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((store) => store.user);
  const fromUserId = loggedInUser._id;

  const { firstName, lastName, photoUrl, age, gender, about, skills, _id } = feedUser;
  const viewProfile = (feedUser) => {
    navigate(`/view-profile`, { state: {userProfile: feedUser } });
  };
  const requestSend = async (status) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, { fromUserId }, {
        withCredentials: true,
      });
      dispatch(removeFeed(_id)); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl max-w-sm mx-auto">
      <div onClick = {()=>{viewProfile(feedUser)}}className="flex flex-col items-center p-6">
        <img src={photoUrl} alt="user-photo" className="w-28 h-28 rounded-full mb-4" />
        <h2 className="text-2xl font-semibold text-darkPurple text-center">{firstName} {lastName}</h2>
         <span className="text-sm text-gray-600">
        {about?.length > 50 ? `${about.substring(0, 50)}...` : about}
      </span>
      </div>
      <div className="flex justify-between gap-2 px-6 py-4 ">
        <button
          onClick={() => requestSend("ignored")}
          className="btn bg-darkCharcoalGray text-lightGray hover:bg-gray-500 px-4 py-2 rounded-lg"
        >
          Ignore
        </button>
        <button
          onClick={() => requestSend("interested")}
          className="btn bg-electricBlue text-softWhite hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
