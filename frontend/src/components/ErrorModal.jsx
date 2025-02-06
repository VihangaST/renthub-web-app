import { useEffect } from'react';
const Modal = ({ isOpen, onClose, message, type = 'error' }) => {
  // Add an event listener for the Enter key
useEffect(() => {
const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
    onClose();
    }
};

if (isOpen) {
    document.addEventListener('keydown', handleKeyDown);
}

// Clean up the event listener when the modal is closed or component unmounts
return () => {
    document.removeEventListener('keydown', handleKeyDown);
};
}, [isOpen, onClose]);

if (!isOpen) return null;

// Dynamic values based on modal type ('error' or 'notification')
const modalTitle = type === 'error' ? 'Error' : 'Notification';
const titleColor = type === 'error' ? 'text-red-600' : 'text-green-600';
const buttonColor = type === 'error' ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500';

return (
<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 max-w-sm">
    <div className="flex justify-between items-center mb-2">
        <h2 className={`text-lg font-semibold ${titleColor}`}>{modalTitle}</h2>
    </div>
    <div className="text-sm text-gray-700 mb-2">
        {message}
    </div>
    <div className="flex justify-end">
        <button
        className={`${buttonColor} text-white px-4 py-2 rounded`}
        onClick={onClose}
        >
        Close
        </button>
    </div>
    </div>
</div>
);
};

export default Modal;