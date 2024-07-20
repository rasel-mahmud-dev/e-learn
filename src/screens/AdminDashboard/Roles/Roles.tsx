import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useAdminDashboardState} from "../../../store/categoriesState.ts";
import CommonTable, {CommonTableColumn} from "../../../components/CommonTable.tsx";
import {showDateTime} from "../../../utils/date.ts";

const Roles = () => {

    const {roles, fetchRoles, removeRole} = useAdminDashboardState()

    useEffect(() => {
        fetchRoles()
    }, [])

    function handleDelete(id: string) {
        removeRole(id)
    }

    const columns: CommonTableColumn[] = [
        {
            tdThClass: "w-20",
            name: "ID",
            field: "id"
        },
        {
            name: "Name",
            field: "name"
        },
        {
            name: "Slug",
            field: "slug"
        }, {
            name: "Description",
            field: "description"
        },
        {
            name: "CreatedAt",
            field: "createdAt",
            render: (date: string) => showDateTime(date)
        },
        {
            name: "Action",
            field: "",
            thClass: "flex justify-center",
            render: (_, item) => (
                <div className="flex items-center justify-end gap-x-2">
                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger2 px-10">Delete</button>
                    <button className="btn btn-primary2 px-10">
                        <Link to={`/dashboard/roles/edit/${item.slug}`}>Edit</Link>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="container w-full mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Roles</h1>
                <button className="btn btn-primary2 mt-5 px-20">
                    <Link to="/dashboard/roles/add">New Role</Link>
                </button>
            </div>
            <h4 className="text-lg font-medium mt-2"> Add information about roles</h4>

            <div>
                {!roles.length && (
                    <div>
                        <h1>
                            No topics found.
                            <Link to="/dashboard/roles/add">Create one</Link>
                        </h1>

                    </div>
                )}

                <div>
                    <CommonTable column={columns} data={roles}/>
                </div>
            </div>

        </div>
    );
};

export default Roles;