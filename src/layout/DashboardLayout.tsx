import React from 'react';
import {Link, Outlet} from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import {useAuthState} from "../store/authState.ts";
import {AiFillHeart} from "react-icons/ai";

const sidebarItems = [

    {title: "View public profile", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Profile", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Photo", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Account Security", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Subscriptions", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Payment methods", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Privacy", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Notifications", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "API clients", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
    {title: "Close account", link: "/dashboard/profile", icon: () => <AiFillHeart/>},

]

const DashboardLayout = () => {
    const {auth} = useAuthState()
    return (
        <div>
            <Header/>

            <div className="flex ">
                <Sidebar>

                    <div className="p-4 text-center mx-auto">
                        <img className=" mx-auto "
                             src="https://demo.edublink.co/wp-content/uploads/2023/06/logo-dark.png"/>
                        <h1 className="text-xl font-semibold mt-4">{auth?.fullName}</h1>
                    </div>

                    <ul className="p-4">

                        {sidebarItems.map(item => (

                            <Link key={item.link} to={item.link}>
                                <li className="px-2 py-2 my-2 hover-bg-primary-1" key={item.link}>  {item.title}   </li>
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