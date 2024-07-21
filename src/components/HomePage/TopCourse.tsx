import React, {useEffect} from 'react';
import {useTopCourses} from "../../store/useTopCourses.ts";
import {Link} from "react-router-dom";

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
            <div className="grid grid-cols-5 gap-4">
                {courses.map((course) => (
                    <Link to={`/course/${course.slug}`}>
                        <div className="card car">
                            <img className="w-full" src="/img.png" alt=""/>
                            <h2 className="text-base font-medium">{course.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopCourse;