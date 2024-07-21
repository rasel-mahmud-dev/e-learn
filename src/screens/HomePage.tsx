import React from 'react';
import Hero from "../components/Hero/Hero.tsx";
import TopCategories from "../components/TopCategories.tsx";
import TopCourse from "../components/HomePage/TopCourse.tsx";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <TopCategories />
            <TopCourse/>
        </div>
    );
};

export default HomePage;