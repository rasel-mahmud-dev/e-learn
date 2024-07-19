import React, {useEffect, useState} from 'react';
import TextInput from "../../components/components/TextInput.tsx";
import {useAuthState} from "../../store/authState.ts";
import {api} from "../../apis";

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
        {
            name: "Bio",
            field: "aboutMe",
            as: "textarea"
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
        {
            name: "Github",
            field: "github",
            prefix: "https://www.github.com/",
            placeholder: "Github Profile"
        },

    ]
}

type ProfileType = {
    headline: string
    aboutMe: string
    youtube: string
    facebook: string
    github: string
    language: string

    firstName?: string
    lastName?: string
    fullName?: string
    email?: string
}


const Profile = () => {

    const {auth} = useAuthState()

    const [state, setState] = useState({})
    const [profile, setProfile] = useState<ProfileType>()


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        api.patch("/users/update-profile", state).then(res => {
            console.log(res)
        })
    }

    function loadProfile(userId: string) {
        api.get(`/users/profile/${userId}`, state).then(res => {
            setProfile(res.data.data)
        })
    }

    useEffect(() => {
        if (auth) {
            const updatedState = {} as ProfileType
            if (auth.firstName) updatedState["firstName"] = auth.firstName
            if (auth.lastName) updatedState["lastName"] = auth.lastName
            if (auth.fullName) updatedState["fullName"] = auth.fullName
            if (auth.email) updatedState["email"] = auth.email
            loadProfile(auth.id)
            setState(updatedState)
        }
    }, [auth])

    useEffect(() => {
        if (profile) {
            const updatedState = {} as ProfileType
            if (profile.firstName) updatedState["firstName"] = profile.firstName
            if (profile.lastName) updatedState["lastName"] = profile.lastName
            if (profile.headline) updatedState["headline"] = profile.headline
            if (profile.aboutMe) updatedState["aboutMe"] = profile.aboutMe
            if (profile.youtube) updatedState["youtube"] = profile.youtube
            if (profile.facebook) updatedState["facebook"] = profile.facebook
            if (profile.github) updatedState["github"] = profile.github
            if (profile.language) updatedState["language"] = profile.aboutMe
            setState(prevState => ({...prevState, ...updatedState}))
        }
    }, [profile])



    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">Public Profile</h1>
            <h4 className="text-lg font-medium mt-2"> Add information about yourself</h4>

            <form onSubmit={handleSave}>

                {Object.keys(formInputs).map(key => {
                    const value = formInputs[key];
                    return (
                        <div key={key} className="mt-5">
                            <h3 className="text-base font-semibold">{key}</h3>
                            <div>
                                {value.map(input => (
                                    <div className="mt-4">
                                        <TextInput onChange={handleChange} name={input.field} label={input.name}
                                                   placeholder={input.placeholder}
                                                   value={state[input.field]}
                                                   as={input.as}
                                        />
                                        {input.helper && <div className="text-xs pt-2">{input.helper}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}

                <button className="btn btn-primary2 mt-5 px-20">Update</button>

            </form>


        </div>
    );
};

export default Profile;