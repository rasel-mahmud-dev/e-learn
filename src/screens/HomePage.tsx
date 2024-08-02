import React from 'react';
import Hero from "../components/Hero/Hero.tsx";
import TopCategories from "../components/TopCategories.tsx";
import TopCourse from "../components/HomePage/TopCourse.tsx";
import AllCourses from "../components/HomePage/AllCourses.tsx";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <TopCategories />
            <TopCourse/>
            <AllCourses />
        </div>
    );
};

export default HomePage;