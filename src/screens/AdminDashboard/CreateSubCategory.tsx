import React, {useEffect, useState} from 'react';
import TextInput from "../../components/components/TextInput.tsx";
import {useAuthState} from "../../store/authState.ts";
import {api} from "../../apis";
import {useParams} from "react-router-dom";

const formInputs = [
    {name: "Title", field: "title", helper: "", placeholder: "Enter title"},
    {name: "Image", field: "image", helper: "", placeholder: "Image Url"},
    {
        name: "Description",
        field: "description",
        as: "textarea",
        placeholder: "Enter Desc"
    },
]


const CreateCategory = () => {

    const {auth} = useAuthState()

    const {updateSlug} = useParams()

    const [state, setState] = useState({})


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        api.post("/categories", [state]).then(res => {
            console.log(res)
        })
    }

    function loadProfile(userId: string) {
        // api.get(`/users/profile/${userId}`, state).then(res => {
        //     setProfile(res.data.data)
        // })
    }

    // useEffect(() => {
    //     if (auth) {
    //         const updatedState = {} as ProfileType
    //         if (auth.firstName) updatedState["firstName"] = auth.firstName
    //         if (auth.lastName) updatedState["lastName"] = auth.lastName
    //         if (auth.fullName) updatedState["fullName"] = auth.fullName
    //         if (auth.email) updatedState["email"] = auth.email
    //         loadProfile(auth.id)
    //         setState(updatedState)
    //     }
    // }, [auth])
    //
    // useEffect(() => {
    //     if (profile) {
    //         const updatedState = {} as ProfileType
    //         if (profile.firstName) updatedState["firstName"] = profile.firstName
    //         if (profile.lastName) updatedState["lastName"] = profile.lastName
    //         if (profile.headline) updatedState["headline"] = profile.headline
    //         if (profile.aboutMe) updatedState["aboutMe"] = profile.aboutMe
    //         if (profile.youtube) updatedState["youtube"] = profile.youtube
    //         if (profile.facebook) updatedState["facebook"] = profile.facebook
    //         if (profile.github) updatedState["github"] = profile.github
    //         if (profile.language) updatedState["language"] = profile.aboutMe
    //         setState(prevState => ({...prevState, ...updatedState}))
    //     }
    // }, [profile])


    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">{updateSlug ? "Update " : "Create "} Category</h1>
            <h4 className="text-lg font-medium mt-2"> Add information about category</h4>

            <form onSubmit={handleSave}>

                {formInputs.map(input => (


                    <div className="mt-4">
                        <TextInput onChange={handleChange} name={input.field} label={input.name}
                                   placeholder={input.placeholder}
                                   value={state[input.field]}
                                   as={input.as}
                        />
                        {input.helper && <div className="text-xs pt-2">{input.helper}</div>}

                    </div>
                ))}


                <button className="btn btn-primary2 mt-5 px-20">{updateSlug ? "Update" : "Create"}</button>

            </form>


        </div>
    );
};

export default CreateCategory;