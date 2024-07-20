import React, {ReactNode, useEffect, useState} from 'react';
import {TiTimes} from "react-icons/ti";
import Popup from "../../../components/components/Popup.tsx";
import {api} from "../../../apis";
import ToastService from "../../../services/ToastService.tsx";

const AssignRoleModal = ({onClose, userId, roles, userRoles, isOpen}: {
    modalClass?: string,
    onClose: Function,
    userRoles: any,
    userId: string,
    roles: any,
    children: ReactNode,
    isOpen: boolean
}) => {

    useEffect(() => {

        if (userRoles?.roles) {
            const roleArr = JSON.parse(userRoles?.roles)
            if (Array.isArray(roleArr)) {
                setSelectedRoles(roleArr?.filter(item => item))
            }
        }

    }, [userRoles]);


    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    function handleToogleSelectRole(roleId: string) {
        setSelectedRoles(prev => prev.includes(roleId) ? prev.filter(roleIds => roleIds !== roleId) : [...prev, roleId])
    }

    function isSelectedRole(roleId: string) {
        return selectedRoles.includes(roleId) ? "bg-primary-400 !text-white" : ""
    }

    async function handleUpdateRole() {
        try {
            if (!userRoles?.userId) return ToastService.openError("Please select a user");

            const {status} = await api.post(`/api/v1/roles/users-roles/${userRoles.userId}`, selectedRoles)

            if (status === 201) {
                ToastService.openSuccess("Successfully updated user roles")
                onClose()
            }

        } catch (ex) {
            console.log(ex)
        }
    }


    return userRoles && (

        <Popup isOpenBackdrop={true} className={`bg-white max-w-2xl w-full `}
               onClose={() => onClose("")} isOpen={isOpen}>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-center">Assign User Roles</h2>
                    <TiTimes className="text-xl cursor-pointer hover:text-red-500" onClick={() => onClose()}/>
                </div>
                <div>
                    <div>
                        <h4 className="text-xl font-medium mb-3">{userRoles?.email}</h4>


                        <label className="text-sm font-medium block mb-3" htmlFor="">Select Roles</label>

                        <div className="border p-3  rounded-lg border-primary-300">
                            <div className="flex items-center gap-x-2">
                                {roles.map(role => (
                                    <div onClick={() => handleToogleSelectRole(role.roleId)}
                                         className={`bg-primary-300/10 p-2 text-primary-500 ${isSelectedRole(role.roleId)}`}>
                                        {role.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button onClick={handleUpdateRole} className="btn btn-black px-10">
                        Update Role
                    </button>
                </div>
            </div>
        </Popup>

    );
};

export default AssignRoleModal;