import React, {useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import {useAuthState} from "../store/authState.ts";
import {AiFillHeart} from "react-icons/ai";

const sidebarItems = [

    {
        id: 1,
        title: "General",
        icon: () => <AiFillHeart/>,
        children: [
            {title: "View public profile", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
            {title: "Profile", link: "/dashboard/profile", icon: () => <AiFillHeart/>},
            {title: "Photo", link: "/dashboard/edit-photo", icon: () => <AiFillHeart/>},
        ],
    },

    {
        id: 2,
        title: "Instructor Zone",
        icon: () => <AiFillHeart/>,
        children: [
            {title: "Instructors", link: "/dashboard/instructors", icon: () => <AiFillHeart/>},
            {title: "My Courses", link: "/dashboard/instructors/my-courses", icon: () => <AiFillHeart/>},
            {title: "Create Course", link: "/dashboard/instructors/create-course", icon: () => <AiFillHeart/>},
        ],
    },

    {
        id: 3,
        title: "Administration",
        icon: () => <AiFillHeart/>,
        children: [

            {title: "Categories", link: "/dashboard/categories", icon: () => <AiFillHeart/>},

            {title: "Sub Categories", link: "/dashboard/sub-categories", icon: () => <AiFillHeart/>},
            {title: "Topics", link: "/dashboard/topics", icon: () => <AiFillHeart/>},

            {title: "Instructor List", link: "/dashboard/instructor-list", icon: () => <AiFillHeart/>},
            {title: "Roles", link: "/dashboard/roles", icon: () => <AiFillHeart/>},
            {title: "Users Roles", link: "/dashboard/users-roles", icon: () => <AiFillHeart/>},


        ],
    },



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

    const [isExpand, setExpand] = useState([1, 5]);
    function toggleExpand(item) {
        setExpand(prev=> prev.includes(item.id) ? prev.filter(it=>it !== item.id) : [...prev, item.id] )
    }

    return (
        <div>
            <Header/>

            <div className="flex ">
                <Sidebar  items={sidebarItems} isExpand={isExpand} toggleExpand={toggleExpand} >

                    <div className="p-4 text-center mx-auto">

                        <div className="avatar">
                            <div className="ring-emerald-600 ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
                                <img   src={auth?.avatar}/>
                            </div>
                        </div>


                        <h1 className="text-xl font-semibold mt-4">{auth?.fullName}</h1>
                    </div>

                    {/*<ul className="p-4 dashboard-content">*/}

                    {/*    {sidebarItems.map(item => (*/}

                    {/*        <Link key={item.link} to={item.link}*/}
                    {/*              className="flex items-center gap-x-2 hover-bg-primary-1 px-2 py-2 my-2">*/}
                    {/*            {item.icon?.()}*/}
                    {/*            <li className=" " key={item.link}>  {item.title}   </li>*/}
                    {/*        </Link>*/}

                    {/*    ))}*/}


                    {/*</ul>*/}
                </Sidebar>

                <div className="p-4 w-full" style={{marginLeft: "350px"}}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;