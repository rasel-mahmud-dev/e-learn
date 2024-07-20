import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useAdminDashboardState} from "../../../store/categoriesState.ts";
import CommonTable, {CommonTableColumn} from "../../../components/CommonTable.tsx";

const UsersRolesManager = () => {

    const {fetchUsersRoles, roles, fetchRoles, usersRoles} = useAdminDashboardState()

    useEffect(() => {
        fetchUsersRoles()
        fetchRoles()
    }, [])

    function handleDelete(id: string) {

    }

    const columns: CommonTableColumn[] = [
        {
            tdThClass: "w-20",
            name: "SL.",
            field: "id",
            render: (_, __, i) => <span>{i + 1}</span>,
        },
        {
            name: "Email",
            field: "email"
        },
        {
            name: "Role",
            field: "roles",
            render: (userRoles => {
                const a = JSON.parse(userRoles)
                const role = roles?.filter(role => a.includes(role.roleId))

                return (
                    <div className="flex items-center gap-x-2">
                        {role.map(item => (
                            <div className="bg-primary-300/10 text-primary-600 text-sm font-medium p-2">
                                {item.name}
                            </div>
                        ))}
                    </div>
                )
            })
        },


        {
            name: "Action",
            field: "",
            thClass: "flex justify-center",
            render: (_, item) => (
                <div className="flex items-center justify-center gap-x-2">
                    {/*<button onClick={() => handleDelete(item.id)} className="btn btn-danger2 px-10">Delete</button>*/}
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
                <h1 className="text-4xl font-semibold">Users Roles</h1>

            </div>
            <h4 className="text-lg font-medium mt-2"> Add information about roles</h4>

            <div className="mt-10">
                {!usersRoles.length && (
                    <div>
                        <h1>
                            No topics found.
                            <Link to="/dashboard/roles/add">Create one</Link>
                        </h1>

                    </div>
                )}

                <div>
                    <CommonTable column={columns} data={usersRoles}/>
                </div>
            </div>

        </div>
    );
};

export default UsersRolesManager;