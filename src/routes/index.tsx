import {createBrowserRouter, Outlet} from "react-router-dom";
import HomePage from "../screens/HomePage.tsx";
import DashboardLayout from "../layout/DashboardLayout.tsx";
import ListOfCourse from "../screens/Dashboard/ListOfCourse.tsx";
import CourseDetail from "../screens/CourseDetail.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import TopicSearch from "../screens/TopicSearch.tsx";
import CourseSearch from "../screens/CourseSearch.tsx";
import SignUp from "../screens/SignUp.tsx";
import Login from "../screens/Login.tsx";
import Profile from "../screens/Dashboard/Profile.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import EditPhoto from "../screens/Dashboard/EditPhoto.tsx";

import Categories from "../screens/AdminDashboard/Categories.tsx";
import CreateCategory from "../screens/AdminDashboard/CreateCategory.tsx";
import SubCategories from "../screens/AdminDashboard/SubCategories.tsx";
import CreateSubCategory from "../screens/AdminDashboard/CreateSubCategory.tsx";
import Topics from "../screens/AdminDashboard/Topics/Topics.tsx";
import CreateTopic from "../screens/AdminDashboard/Topics/CreateTopic.tsx";
import CreateCourse from "../screens/InstructorsZone/CreateCourse.tsx";
import InstructorCourses from "../screens/InstructorsZone/InstructorCourses.tsx";
import Instructors from "../screens/InstructorsZone/Instructors.tsx";
import Roles from "../screens/AdminDashboard/Roles/Roles.tsx";
import CreateRole from "../screens/AdminDashboard/Roles/CreateRole.tsx";
import UsersRolesManager from "../screens/AdminDashboard/Roles/UsersRolesManager.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "",
                element: <HomePage/>
            },

            {
                path: "/course/:slug",
                element: <CourseDetail/>
            },
            {
                path: "/topic/:topic",
                element: <TopicSearch/>
            },
            {
                path: "/search",
                element: <CourseSearch/>
            },
            {
                path: "/join/signup",
                element: <SignUp/>
            },
            {
                path: "/join/login",
                element: <Login/>
            },
        ]
    },

    // {
    //     path: "/dashboard",
    //     element: <ProtectedRoute> <DashboardLayout/></ProtectedRoute>,
    //     children: [
    //         {path: "create-course", element: <CreateCourse/>},
    //         {path: "course-list", element: <ListOfCourse/>},
    //         {
    //             path: "profile",
    //             element: <Profile/>
    //         }, {
    //             path: "edit-photo",
    //             element: <EditPhoto/>
    //         },
    //     ]
    // },

    {
        path: "/dashboard",
        element: <ProtectedRoute> <DashboardLayout/></ProtectedRoute>,
        children: [
            {path: "create-course", element: <CreateCourse/>},
            {path: "course-list", element: <ListOfCourse/>},

            {
                path: "profile",
                element: <Profile/>
            }, {
                path: "edit-photo",
                element: <EditPhoto/>
            },



            {path: "roles", element: <Roles/>},
            {path: "users-roles", element: <UsersRolesManager/>},
            {path: "roles/add", element: <CreateRole/>},
            {path: "roles/edit/:updateSlug", element: <CreateRole/>},


            {path: "categories", element: <Categories/>},
            {path: "categories/add", element: <CreateCategory/>},
            {path: "categories/edit/:updateSlug", element: <CreateCategory/>},

            {path: "sub-categories", element: <SubCategories/>},
            {path: "sub-categories/add", element: <CreateSubCategory/>},
            {path: "sub-categories/edit/:updateSlug", element: <CreateSubCategory/>},

            {path: "topics", element: <Topics/>},
            {path: "topics/add", element: <CreateTopic/>},
            {path: "topics/edit/:updateSlug", element: <CreateTopic/>},

            {
                path: "instructors", element: <Instructors/>, children: [
                    {path: "create-course", element: <CreateCourse/>},
                    {path: "my-courses", element: <InstructorCourses/>},
                ]
            },


            {
                path: "profile",
                element: <Profile/>
            }, {
                path: "edit-photo",
                element: <EditPhoto/>
            },
        ]
    },
]);

export default router