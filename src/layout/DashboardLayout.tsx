import React from 'react';
import {Link, Outlet} from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div>

            <Link to="/dashboard/course-list">course-list</Link>
            <Link to="/dashboard/create-course">Create</Link>
            <Outlet />
        </div>
    );
};

export default DashboardLayout;