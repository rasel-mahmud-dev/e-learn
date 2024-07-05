import {createBrowserRouter} from "react-router-dom";
import HomePage from "../screens/HomePage.tsx";
import DashboardLayout from "../layout/DashboardLayout.tsx";
import CreateCourse from "../screens/Dashboard/CreateCourse.tsx";
import ListOfCourse from "../screens/Dashboard/ListOfCourse.tsx";
import CourseDetail from "../screens/CourseDetail.tsx";
import MainLayout from "../layout/MainLayout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <HomePage />
            },

            {
                path: "/course/:slug",
                element: <CourseDetail />
            },

        ]

    },


    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "create-course", element: <CreateCourse />},
            { path: "course-list", element: <ListOfCourse />}
        ]
    },
]);

export default router