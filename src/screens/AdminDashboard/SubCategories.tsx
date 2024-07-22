import React, {useEffect} from 'react';
import {useAdminDashboardState} from "../../store/categoriesState.ts";
import {Link} from "react-router-dom";
import CommonTable, {CommonTableColumn} from "../../components/CommonTable.tsx";
import {showDateTime} from "../../utils/date.ts";

const SubCategories = () => {

    const {subCategories, fetchSubCategories, removeSubCategory} = useAdminDashboardState()


    useEffect(() => {
        fetchSubCategories()
    }, [])

    function handleDelete(id: string) {
        removeSubCategory(id)
    }

    const columns: CommonTableColumn[] = [
        {
            tdThClass: "w-20",
            name: "ID",
            field: "id"
        },
        {
            name: "Title",
            field: "title"
        },
        {
            name: "Slug",
            field: "slug"
        },
        {
            name: "CreatedAt",
            field: "createdAt",
            render: (i)=>showDateTime(i)
        },
        {
            name: "Action",
            field: "",
            thClass: "flex justify-center",
            render: (_, item) => (
                <div className="flex items-center justify-end gap-x-2">
                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger2 px-10">Delete</button>
                    <button className="btn btn-primary2 px-10">
                        <Link to={`/admin-dashboard/sub-categories/edit/${item.slug}`}>Edit</Link>
                    </button>
                </div>
            )
        }
    ];
    return (
        <div className="container w-full mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Sub Categories</h1>
                <button className="btn btn-primary2 mt-5 px-20">
                    <Link to="/admin-dashboard/sub-categories/add">New</Link>
                </button>
            </div>
            <h4 className="text-lg font-medium mt-2"> Add information about sub categories</h4>

            <div>
                {!subCategories.length && (
                    <div>
                        <h1>
                            No Category found.
                            <Link to="/admin-dashboard/sub-categories/add">Create one</Link>
                        </h1>

                    </div>
                )}

                <div>
                    <CommonTable column={columns} data={subCategories}/>

                </div>
            </div>

        </div>
    );
};

export default SubCategories;