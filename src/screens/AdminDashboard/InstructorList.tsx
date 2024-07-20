import React, {useEffect, useState} from 'react';
import {useAdminDashboardState} from "../../store/categoriesState.ts";
import CommonTable, {CommonTableColumn} from "../../components/CommonTable.tsx";
import {showDateTime} from "../../utils/date.ts";
import AccountStatusModal from "./AccountStatusModal.tsx";
import {a} from "vite/dist/node/types.d-aGj9QkWt";

const InstructorList = () => {

    const {instructors, fetchInstructors} = useAdminDashboardState()


    useEffect(() => {
        fetchInstructors()
    }, [])

    function handleDelete(id: string) {
    }

    const [updateUser, setUpdateUser] = useState<any>(null)


    const columns: CommonTableColumn[] = [
        {
            tdThClass: "w-20",
            name: "ID",
            field: "id",
            render: (_, __, i)=> i + 1
        },
        {
            name: "Username",
            field: "username"
        },
        {
            name: "Email",
            field: "email"
        },
        {
            name: "Join At",
            field: "createdAt",
            render: (date) => showDateTime(date)
        },
        {
            name: "Status",
            field: "accountStatus",
            render: (accountStatus) => {
                const accountStatusObj = JSON.parse(accountStatus || "[]")
                return (
                    <div className="flex items-center gap-x-2">
                        {accountStatusObj?.map(item => (
                            <div className="badge   badge-accent">
                                {item.status}
                            </div>
                        ))}
                    </div>
                )
            }
        },

        {
            name: "Action",
            field: "",
            thClass: "flex justify-end",
            render: (_, item) => (
                <div className="flex items-center justify-end gap-x-2">
                    <button onClick={() => setUpdateUser(item)} className="btn btn-primary2 px-10">Update</button>
                </div>
            )
        }
    ];

    return (
        <div className="container w-full mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">Instructors</h1>

            </div>
            <h4 className="text-lg font-medium mt-2">Information about instructors</h4>

            <AccountStatusModal
                updateUser={updateUser}
                isOpen={updateUser?.userId}
                onClose={() => setUpdateUser(null)}

            />

            <div className="mt-10">
                {instructors.isFetching && (
                    <div>
                        <h1>Category is Fetching...</h1>
                    </div>
                )}

                {!instructors.length && (
                    <div>
                        <h1>
                            No instructors found.

                        </h1>

                    </div>
                )}

                <div>
                    <CommonTable column={columns} data={instructors}/>

                </div>
            </div>

        </div>
    );
};

export default InstructorList;