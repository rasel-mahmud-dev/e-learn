import React, {useEffect, useState} from 'react';
import {api} from "../../apis";
import {Link} from "react-router-dom";

const CreateCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get("/course").then(res => {
            setCourses(res.data);
        })
    }, [])


    return (
        <div className="container mx-auto p-4">

            <h3 className="text-3xl font-bold mb-4">List of Course</h3>

            {courses?.map(course => (
                <div>
                    <Link to={`/course/${course.slug}`}>
                        <h1>{course.title}</h1>
                    </Link>
                </div>
            ))}

        </div>
    );
};

export default CreateCourse;