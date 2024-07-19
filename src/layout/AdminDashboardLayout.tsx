import React from 'react';
import {Link, Outlet} from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import {useAuthState} from "../store/authState.ts";
import {AiFillHeart} from "react-icons/ai";

const sidebarItems = [
    {title: "My Courses", link: "/admin-dashboard/categories", icon: () => <AiFillHeart/>},
    {title: "Categories", link: "/admin-dashboard/categories", icon: () => <AiFillHeart/>},
    {title: "Sub Categories", link: "/admin-dashboard/sub-categories", icon: () => <AiFillHeart/>},
    {title: "Topics", link: "/admin-dashboard/topics", icon: () => <AiFillHeart/>},
    {title: "Instructors", link: "/admin-dashboard/instructors", icon: () => <AiFillHeart/>},
    {title: "Subscriptions", link: "/admin-dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Payment methods", link: "/admin-dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Privacy", link: "/admin-dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Notifications", link: "/admin-dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "API clients", link: "/admin-dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Close account", link: "/admin-dashboard/profile", icon: () => <AiFillHeart/>},
]

const DashboardLayout = () => {
    const {auth} = useAuthState()
    return (
        <div>
            <Header/>

            <div className="flex ">
                <Sidebar>

                    <div className="p-4 text-center mx-auto">

                        <div className="avatar">
                            <div className="ring-emerald-600 ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
                                <img   src={auth?.avatar}/>
                            </div>
                        </div>


                        <h1 className="text-xl font-semibold mt-4">{auth?.fullName}</h1>
                    </div>

                    <ul className="p-4">

                        {sidebarItems.map(item => (

                            <Link key={item.link} to={item.link}
                                  className="flex items-center gap-x-2 hover-bg-primary-1 px-2 py-2 my-2">
                                {item.icon?.()}
                                <li className=" " key={item.link}>  {item.title}   </li>
                            </Link>

                        ))}


                    </ul>
                </Sidebar>

                <div className="p-4 w-full" style={{marginLeft: "350px"}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;