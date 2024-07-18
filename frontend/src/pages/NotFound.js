import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 relative">
      <img
        src='https://i.pinimg.com/originals/16/43/2c/16432c11b519789c27ddc3897deb5b22.jpg'
        alt="Darth Vader"
        className="absolute inset-0 w-full h-full object-fill opacity-30"
      />
      <div className="relative z-10 text-center">
        <span className="text-gray-500 text-6xl block">4 0 4</span>
        <span className="text-gray-500 text-xl">
          Looks like you’ve ventured into a galaxy far, far away!
        </span>
        <blockquote className="text-gray-400 text-lg italic mt-4">
          "I find your lack of faith disturbing."
        </blockquote>
      </div>
      <div className="mt-6 relative z-10">
        <Link to="/Dashboard" className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">
          Go back to the light side
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
