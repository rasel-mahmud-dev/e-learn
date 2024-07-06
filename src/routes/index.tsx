import {createBrowserRouter} from "react-router-dom";
import HomePage from "../screens/HomePage.tsx";
import DashboardLayout from "../layout/DashboardLayout.tsx";
import CreateCourse from "../screens/Dashboard/CreateCourse.tsx";
import ListOfCourse from "../screens/Dashboard/ListOfCourse.tsx";
import CourseDetail from "../screens/CourseDetail.tsx";
import MainLayout from "../layout/MainLayout.tsx";
import TopicSearch from "../screens/TopicSearch.tsx";
import CourseSearch from "../screens/CourseSearch.tsx";
import SignUp from "../screens/SignUp.tsx";
import Login from "../screens/Login.tsx";


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

    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {path: "create-course", element: <CreateCourse/>},
            {path: "course-list", element: <ListOfCourse/>}
        ]
    },
]);

export default router