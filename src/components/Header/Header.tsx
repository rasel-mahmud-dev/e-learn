import React from 'react';
import {useCategoryState} from "../../store/categoriesState.ts";
import {Link} from "react-router-dom";

const Header = () => {

    const {categories} = useCategoryState()

    return (

        <nav className="navbar bg-base-100">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="container flex items-center">
                    <a href="#" className="w-auto h-8">
                        <img src="https://demo.edublink.co/wp-content/uploads/2023/06/logo-dark.png"
                             alt="Your Platform Logo"/>
                    </a>
                    <div className="flex items-center">
                        <input type="text" placeholder="Search for courses"
                               className="w-full mr-4 rounded-lg border border-gray-300 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
                        <i className="bi bi-search"></i>
                    </div>
                    <select className="dropdown">
                        <option value="">All Categories</option>

                        {categories.map(category => (
                            <option value={category.slug}>{category.title}</option>
                        ))}

                        <option value="development">Development</option>
                        <option value="design">Design</option>
                    </select>


                </div>

                <div className="dropdown">
                    <button className="btn btn-outline">John Doe</button>
                    <div className="dropdown-content">
                       <div className="flex flex-col items-center justify-between">
                           <Link to="/dashboard/create-course" className="dropdown-item">My Course</Link>
                           <Link to="/create-course" className="dropdown-item">Profile</Link>
                           <Link to="/CreateCourse" className="dropdown-item">Settings</Link>
                           <Link to="/CreateCourse" className="dropdown-item">Logout</Link>
                       </div>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Header;