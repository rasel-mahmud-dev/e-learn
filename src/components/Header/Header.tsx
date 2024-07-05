import React from 'react';
import {useCategoryState} from "../../store/categoriesState.ts";

const Header = () => {

    const {categories} = useCategoryState()

    return (
        <nav className="navbar bg-base-100">
            <div className="container flex items-center">
                <a href="#" className="w-auto h-8">
                    <img src="https://demo.edublink.co/wp-content/uploads/2023/06/logo-dark.png" alt="Your Platform Logo"/>
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
                <div className="dropdown">
                    <button className="btn btn-outline">John Doe</button>
                    <div className="dropdown-content">
                        <a href="#" className="dropdown-item">Profile</a>
                        <a href="#" className="dropdown-item">Settings</a>
                        <a href="#" className="dropdown-item">Logout</a>
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Header;