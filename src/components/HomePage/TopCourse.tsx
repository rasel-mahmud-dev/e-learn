import React, {useEffect} from 'react';
import {useTopCourses} from "../../store/useTopCourses.ts";
import {Link} from "react-router-dom";
import Rating from "../Reviews/Rating.tsx";
import Rate from "../Reviews/Rate.tsx";

const TopCourse = () => {

    const {courses, fetchTopCourses} = useTopCourses()

    useEffect(() => {
        fetchTopCourses()
    }, []);

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold  ">Top Courses</h2>
            <p className="text-gray-500 mb-12 mt-4">
                Dis phasellus urna ultricies aptent vestibulum lectus. Venenatis metus habitant natoque efficitur
                ultricies porta ligula nisl.
                Pede pellentesque fames nostra leo tincidunt luctus dis per nullam. Magna dis nisl sapien aliquet
                ridiculus magnis vivamus senectus. Consectetur si aliquam imperdiet dignissim nam diam fermentum.
                Natoque et vulputate ut consectetuer
                <br/>

                rutrum inceptos ligula habitant letius pharetra. Aliquam si luctus sociosqu accumsan aptent porta
                fermentum letius tellus id.
            </p>
            <div className="grid grid-cols-4 gap-4">
                {courses.map((course) => (
                    <Link to={`/course/${course.slug}`}>
                        <div className="card car">
                            <div className="w-full">
                                <img className="w-[500px] object-cover"
                                     src={course.thumbnail} alt=""/>
                            </div>

                            <div className="">
                                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                                <p className="text-gray-700 mb-4">Dr. Angela Yu, Developer and Lead Instructor</p>
                                <div className="flex items-center mb-2">
                                     <Rate rate={4}  />
                                    <span className="ml-2 text-gray-700">4.7</span>
                                    <span className="ml-1 text-gray-500">(393,448)</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-lg font-semibold">${(course.price - 100).toFixed(2)}</span>
                                    <span className="ml-2 text-gray-500 line-through">${course.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopCourse;