import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiUsers, FiBriefcase } from 'react-icons/fi'; // Icons from react-icons
import { useSelector } from 'react-redux';

const BottomNavigation = () => {
  const user = useSelector((store)=>store.user);
  return user && (
    <div className="fixed bottom-0 left-0 w-full bg-vibrantClay text-softWhite border-t border-gray-700">
      <div className="flex justify-around items-center py-2">
        <Link to="/" className="flex flex-col items-center text-black hover:text-lightGray">
          <FiHome size={24} />
          <span className="text-sm">Feed</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center text-black hover:text-lightGray">
          <FiMessageSquare size={24} />
          <span className="text-sm">Chat</span>
        </Link>
        <Link to="/connections" className="flex flex-col items-center text-black hover:text-lightGray">
          <FiUsers size={24} />
          <span className="text-sm">Connections</span>
        </Link>
        <Link to="/experts" className="flex flex-col items-center text-black hover:text-lightGray">
          <FiBriefcase size={24} />
          <span className="text-sm">Experts</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
