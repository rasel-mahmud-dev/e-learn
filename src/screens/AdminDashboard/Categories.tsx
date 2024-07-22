import React, {useEffect} from 'react';
import {useAdminDashboardState} from "../../store/categoriesState.ts";
import {Link} from "react-router-dom";
import CommonTable, {CommonTableColumn} from "../../components/CommonTable.tsx";
import {showDateTime} from "../../utils/date.ts";

const Categories = () => {

    const {categories, fetchCategories, removeCategory} = useAdminDashboardState()


    useEffect(() => {
        fetchCategories()
    }, [])

    function handleDelete(id: string) {
        removeCategory(id)
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
                        <Link to={`/admin-dashboard/categories/edit/${item.slug}`}>Edit</Link>
                    </button>
                </div>
            )
        }
    ];
    return (
        <div className="container w-full mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Categories</h1>
                <button className="btn btn-primary2 mt-5 px-20">
                    <Link to="/admin-dashboard/categories/add">New Category</Link>
                </button>
            </div>
            <h4 className="text-lg font-medium mt-2"> Add information about yourself</h4>

            <div>
                {categories.isFetching && (
                    <div>
                        <h1>Category is Fetching...</h1>
                    </div>
                )}

                {!categories.length && (
                    <div>
                        <h1>
                            No Category found.
                            <Link to="/admin-dashboard/categories/add">Create one</Link>
                        </h1>

                    </div>
                )}

                <div>
                    <CommonTable column={columns} data={categories}/>

                </div>
            </div>

        </div>
    );
};

export default Categories;