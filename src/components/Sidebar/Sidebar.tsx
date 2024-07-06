import React from 'react';

const Sidebar = ({children}) => {
    return (
        <div className="fixed top-0 left-0 bg-gray-100 h-screen max-w-xs w-full">
            {children}
        </div>
    );
};

export default Sidebar;