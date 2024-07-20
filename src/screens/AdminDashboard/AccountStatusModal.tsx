import React from 'react';
import {TiTimes} from "react-icons/ti";
import ToastService from "../../services/ToastService.tsx";
import {api} from "../../apis";
import Popup from "../../components/components/Popup.tsx";
import {showDateTime} from "../../utils/date.ts";


const AccountStatusModal = ({onClose, updateUser,   isOpen}: {
    modalClass?: string,
    onClose: Function,
    updateUser: any,
    isOpen: boolean
}) => {

    async function handleUnlock(accountStatusId: string) {
        try {
            if (!accountStatusId) return ToastService.openError("Please select a account status");

            const {status} = await api.post(`/api/v1/account/unblock/${updateUser.userId}/${accountStatusId}`)

            if (status === 201) {
                ToastService.openSuccess("Successfully updated user roles")
                onClose()
            }

        } catch (ex) {
            console.log(ex)
        }
    }

    const accountStatus = JSON.parse(updateUser?.accountStatus || "[]")

    return updateUser && (

        <Popup isOpenBackdrop={true} className={`bg-white max-w-2xl w-full `}
               onClose={() => onClose("")} isOpen={isOpen}>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-center">Account Status</h2>
                    <TiTimes className="text-xl cursor-pointer hover:text-red-500" onClick={() => onClose()}/>
                </div>
                <div>
                    <div>
                        <h4 className="text-xl font-medium mb-3">{updateUser?.email}</h4>


                        <label className="text-sm font-medium block  " htmlFor="">Status</label>

                        <div className="">
                            <div className="flex   gap-x-2 flex-col">

                                {accountStatus?.length === 0 && (
                                    <div>
                                        <p className="text-sm font-medium">There is no account status.</p>
                                    </div>
                                )}

                                {accountStatus.map(item => (

                                    <div className="items-center gap-x-2 py-3">
                                        <div className="flex items-center gap-x-2  ">
                                            <p className="text-sm font-medium">{showDateTime(item.created_at)}</p>
                                            <div className="badge  badge-accent my-1">
                                                {item.status}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500">{item.note}</p>

                                        <div onClick={() => handleUnlock(item.id)}
                                             className="text-sm font-medium cursor-pointer">
                                            Remove
                                        </div>


                                    </div>
                                ))}


                                {/*{roles.map(role => (*/}
                                {/*    <div onClick={() => handleToogleSelectRole(role.roleId)}*/}
                                {/*         className={`bg-primary-300/10 p-2 text-primary-500 ${isSelectedRole(role.roleId)}`}>*/}
                                {/*        {role.name}*/}
                                {/*    </div>*/}
                                {/*))}*/}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </Popup>

    );
};

export default AccountStatusModal;