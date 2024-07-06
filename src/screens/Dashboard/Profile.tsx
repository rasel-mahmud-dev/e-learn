import React, {useEffect, useState} from 'react';
import TextInput from "../../components/components/TextInput.tsx";
import {useAuthState} from "../../store/authState.ts";

const formInputs = {
    Basics: [
        {name: "First Name", field: "firstName", helper: ""},
        {name: "Last Name", field: "lastName", helper: ""},
        {name: "Full Name", field: "fullName", helper: ""},
        {
            name: "Headline",
            field: "headline",
            helper: 'Add a professional headline like, "Instructor at Udemy" or "Architect."'
        },
        {name: "Language", field: "language", helper: ''}
    ],

    Links: [
        {name: "Website", field: "website", placeholder: "Website (http(s)://..)"},
        {
            name: "Twitter",
            field: "twitter",
            prefix: "https://twitter.com/",
            placeholder: "Twitter Profile",
            helper: "Add your Twitter username (e.g. johnsmith)."
        },
        {
            name: "Facebook",
            field: "facebook",
            prefix: "https://www.facebook.com/",
            placeholder: "Facebook Profile",
            helper: "Input your Facebook username (e.g. johnsmith)."
        },
        {
            name: "Youtube",
            field: "youtube",
            prefix: "https://www.youtube.com/",
            placeholder: "Youtube Profile",
            helper: "Input your Youtube username (e.g. johnsmith)."
        },

    ]
}

const Profile = () => {

    const {auth} = useAuthState()

    const [state, setState] = useState({})

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log(state)
    }

    useEffect(()=>{
        if(auth){
            const updatedState = {}
            if(auth.firstName) updatedState["firstName"] = auth.firstName
            if(auth.lastName) updatedState["lastName"] = auth.lastName
            if(auth.fullName) updatedState["fullName"] = auth.fullName
            if(auth.email) updatedState["email"] = auth.email

            setState(updatedState)
        }
    }, [auth])


    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">Public Profile</h1>
            <h4 className="text-lg font-medium mt-2"> Add information about yourself</h4>

            <form onSubmit={handleSave}>

                {Object.keys(formInputs).map(key => {
                    const value = formInputs[key];
                    return (
                        <div key={key}>
                            {value.map(input => (
                                <div className="mt-4">
                                    <TextInput onChange={handleChange} name={input.field} label={input.name}
                                               placeholder={input.placeholder}
                                               value={state[input.field]}/>
                                    {input.helper && <div className="text-xs pt-2">{input.helper}</div>}
                                </div>
                            ))}
                        </div>
                    )
                })}

                <button className="btn btn-primary2 mt-5 px-20">Update</button>

            </form>


        </div>
    );
};

export default Profile;