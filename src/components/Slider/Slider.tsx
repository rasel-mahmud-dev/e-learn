import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

// import required modules
import { Grid, Pagination } from 'swiper/modules';
import {Link} from "react-router-dom";


const Slider = ({courses = []}) => {
    return (
        <div>
            <Swiper
                slidesPerView={3}
                grid={{
                    rows: 2,
                }}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Grid, Pagination]}
                className="mySwiper"
            >
                {courses.map(course => (
                    <SwiperSlide key={course.id}>
                        <Link to={`/topic/${course.slug}`} className="border-gray-500 border-2 w-max px-4 py-1">
                            {course.title}
                        </Link>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;