import React, {useEffect, useRef, useState} from 'react';
import {useAuthState} from "../../store/authState.ts";
import {api} from "../../apis";
import CropImage from "../../components/CropImage/CropImage.tsx";
import chooseFile from "../../utils/chooseFile.ts";
import blobToBase64 from "../../utils/blobToBase64.ts";
import getCroppedImg from "../../utils/getCroppedImg.ts";
import {Crop} from "react-image-crop";
import {Simulate} from "react-dom/test-utils";
import resize = Simulate.resize;
import resizeImage, {resizeProfilePhoto} from "../../utils/resizeImage.ts";


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

const EditPhoto = () => {

    const {auth} = useAuthState()

    const [state, setState] = useState({})
    const [profile, setProfile] = useState<ProfileType>()

    const [resized, setResized] = useState({
        base64: "",
        blob: null,
        fileName: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()

            const formData = new FormData()
            formData.append("avatar", resized.blob, resized.fileName)

            api.patch(`/users/update-profile-photo`, formData).then(res => {
                console.log(res)
            })

        } catch (ex) {

        }
    }

    function loadProfile(userId: string) {
        api.get(`/users/profile/${userId}`, state).then(res => {
            setProfile(res.data)
        })
    }

    useEffect(() => {
        if (auth) {
            loadProfile(auth.id)
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


    async function handleChoosePhoto() {
        try {
            const file = await chooseFile({accept: []})
            if (file) {
                const base64 = await blobToBase64(file)
                const file2 = await resizeProfilePhoto({
                    src: base64,
                    quality: 0.7,
                    targetSize: 300
                })
                setResized({...file2, resized: file.name})
            }
        } catch (ex) {
            console.log(ex)
        }
    }


    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">Photo</h1>

            <h4 className="text-lg font-medium mt-2"> Add information about yourself</h4>

            <form onSubmit={handleSave}>

                <h3 className="text-lg mt-10 font-medium">Image preview</h3>

                <div className="border min-h-40 flex w-full">
                    <div className="w-full">

                        { resized.base64 ? (
                            <img className="mx-auto flex justify-center" src={resized.base64} alt=""/>
                        ): (
                            <img className="mx-auto flex justify-center" src={auth?.avatar} alt=""/>
                        )}


                    </div>
                </div>

                <div>

                    <button type="button" onClick={handleChoosePhoto} className="btn btn-primary2 mt-5 px-20">Choose
                        Photo
                    </button>
                </div>

                <button className="btn btn-primary2 mt-5 px-20">Update</button>

            </form>


        </div>
    );
};

export default EditPhoto;