import React from 'react';
import Rate from "../Reviews/Rate.tsx";

const HorizontalStyle = (props) => {
    const {title, price, authorName, thumbnail} = props
    return (
        <div class="flex w-full overflow-hidden  ">
            <img class="w-[350px]" src={thumbnail} alt="Course Image"/>
            <div>
                <div className="px-6 ">
                    <div className="font-bold text-xl mb-2">The Complete 2024 Web Development Bootcamp</div>
                    <p className="text-gray-700 text-base">
                        Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React,
                        PostgreSQL, Web3 and DApps
                    </p>
                </div>
                <div className="px-6  ">
                    <p
                        className=" text-sm font-semibold text-gray-700  ">Dr. Angela Yu
                    </p>
                    <p
                        className=" text-sm font-semibold text-gray-700  ">Developer
                        and Lead Instructor</p>


                    <div
                        className="flex items-center gap-x-1 rounded-full  text-sm font-semibold text-gray-700  ">
                        <span>4.7</span>
                        <Rate/>
                        <span>(393,448)</span>

                    </div>

                    <p
                        className="rounded-full   text-sm font-semibold text-gray-700  ">61.5
                        total hours · 373 lectures · All Levels</p>
                </div>

            </div>
            <div>
                <div className="px-6 pt-4 pb-2 ">
                    <p className="text-xl font-bold">$12.99</p>
                    <p className="line-through text-gray-500">$74.99</p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalStyle;