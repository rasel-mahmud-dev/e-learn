import React from 'react';
import Header from "../components/Header/Header.tsx";
import Hero from "../components/Hero/Hero.tsx";
import TopCategories from "../components/TopCategories.tsx";

const HomePage = () => {
    return (
        <div>
            <Header />
            <Hero />
            <TopCategories />
        </div>
    );
};

export default HomePage;