import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useInstructorZoneState} from "../../store/categoriesState.ts";


const InstructorCourses = () => {

    const {courses, fetchCourses} = useInstructorZoneState()


    useEffect(() => {
        fetchCourses()
    }, [])

    function handleDelete(id: string) {
        // removeTopic(id)
    }


    return (
        <div className="container w-full mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">My Courses</h1>
                <button className="btn btn-primary2 mt-5 px-20">
                    <Link to="/dashboard/instructors/create-course">Add new</Link>
                </button>
            </div>


            <div>
                {!courses.length && (
                    <div>
                        <h1>
                            No Courses found.
                            <Link to="/dashboard/instructors/create-course">Create one</Link>
                        </h1>

                    </div>
                )}

                <div className="pt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        {courses?.map(course => (
                            <div className="card card-bordered">
                                <img src={course.thumbnail} alt="thumb"/>
                                <div className="p-3">
                                    <h1>{course.title}</h1>
                                    <h1>${course.price}</h1>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </div>
    );
};

export default InstructorCourses;