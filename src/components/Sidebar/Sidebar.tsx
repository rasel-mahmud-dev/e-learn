import React from 'react';

const Sidebar = ({children}) => {
    return (
        <div  className=" sidebar bg-gray-100 h-screen max-w-xs w-full">
            {children}
        </div>
    );
};

export default Sidebar;