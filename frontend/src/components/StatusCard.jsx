import React from 'react';

const StatusCard = ({ date, percentage, text }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-lg mx-auto flex items-center gap-4">
        
        {/* Date */}
        <div className="text-gray-600 text-sm font-medium min-w-[80px]">{date}</div>
        
        {/* Status Bar */}
        <div className="flex-grow h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
            ></div>
        </div>

        {/* Percentage */}
        <div className="text-sm font-medium text-gray-700 w-12 text-center">
            {percentage}%
        </div>

        {/* Text */}
        <div className="flex items-center justify-center w-40 h-8 bg-blue-500 text-white font-bold text-center">
        {/* <div className="text-gray-800 font-semibold min-w-[120px]"> */}
            {text}
        </div>

        <div className="flex flex-col items-center justify-center w-20 h-8 bg-blue-500 text-white font-bold text-center space-y-1">
            <button className="bg-white text-blue-500 text-xs font-semibold py-1 px-2 rounded">
                Book
            </button>
    </div>
    </div>
);
};

export default StatusCard;
