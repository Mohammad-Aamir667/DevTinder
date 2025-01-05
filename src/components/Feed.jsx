import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BASE_URL} from '../utils/constants'
import{ addFeed }from "../utils/feedSlice"
import FeedCard from './FeedCard'
const Feed = () => {
    const dispatch = useDispatch();
    const feedUsers = useSelector((store)=>store.feed);
   
    const getFeed =  async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/feed",{withCredentials:true});
         dispatch(addFeed(res?.data));
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getFeed()
    },[]);

    return feedUsers && (
         <div className="min-h-screen bg-gradient-to-b from-lightGray to-softWhite p-6 mx-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {feedUsers.map((feedUser) => (
          <FeedCard key={feedUser._id} feedUser={feedUser} />
        ))}
      </div>
    </div>
      
    )
}

export default Feed;