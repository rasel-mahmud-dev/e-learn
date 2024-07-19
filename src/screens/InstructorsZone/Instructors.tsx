import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";


const Instructors = () => {

    // const {courses, fetchCourses} = useInstructorZoneState()
    //
    //
    // useEffect(() => {
    //     fetchCourses()
    // }, [])
    //
    // function handleDelete(id: string) {
    //
    // }

    // const columns: CommonTableColumn[] = [
    //     {
    //         tdThClass: "w-20",
    //         name: "ID",
    //         field: "id"
    //     },
    //     {
    //         name: "Title",
    //         field: "title"
    //     },
    //     {
    //         name: "Slug",
    //         field: "slug"
    //     },
    //     {
    //         name: "CreatedAt",
    //         field: "createdAt"
    //     },
    //     {
    //         name: "Action",
    //         field: "",
    //         thClass: "flex justify-center",
    //         render: (_, item) => (
    //             <div className="flex items-center justify-end gap-x-2">
    //                 <button onClick={() => handleDelete(item.id)} className="btn btn-danger2 px-10">Delete</button>
    //                 <button className="btn btn-primary2 px-10">
    //                     <Link to={`/admin-dashboard/topics/edit/${item.slug}`}>Edit</Link>
    //                 </button>
    //             </div>
    //         )
    //     }
    // ];

    return (
        <div className="container w-full mx-auto">


            <div>

                <Outlet />

            </div>

        </div>
    );
};

export default Instructors;