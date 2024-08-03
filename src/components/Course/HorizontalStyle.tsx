import React from 'react';
import Rate from "../Reviews/Rate.tsx";

const HorizontalStyle = (props) => {
    const {title, description, price, authorName, thumbnail} = props
    return (
        <div class="flex w-full overflow-hidden  ">
            <img class="w-full max-w-[350px] h-[180px] object-cover" src={thumbnail} alt="Course Image"/>
            <div>
                <div className="px-6 ">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">
                        {description}
                    </p>
                </div>
                <div className="px-6 mt-2 ">
                    <p
                        className=" text-sm font-semibold text-gray-700">Dr. Angela Yu
                    </p>
                    <p
                        className=" text-sm font-semibold text-gray-700">Developer
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
                    <p className="text-xl font-bold">${price.toFixed(2)}</p>
                    <p className="line-through text-gray-500">$74.99</p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalStyle;