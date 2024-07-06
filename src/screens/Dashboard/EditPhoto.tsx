import React, {useEffect, useRef, useState} from 'react';
import {useAuthState} from "../../store/authState.ts";
import {api} from "../../apis";
import CropImage from "../../components/CropImage/CropImage.tsx";
import chooseFile from "../../utils/chooseFile.ts";
import blobToBase64 from "../../utils/blobToBase64.ts";
import getCroppedImg from "../../utils/getCroppedImg.ts";
import {Crop} from "react-image-crop";


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

    const [crop, setCrop] = useState<Crop>({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })

    const [base64, setBase64] = useState("")

    const [cropped, setCropped] = useState({
        blob: null,
        base64: null,
        done: false
    })

    async function handleChoosePhoto() {
        try {
            setCropped(prevState => ({...prevState,
                done: false
            }))
            const file = await chooseFile({accept: []})
            if (file) {
                const base64 = await blobToBase64(file)
                setBase64(base64)
            }
        } catch (ex) {

        }
    }

    const image = useRef()

    async function handleComplete() {
        try {
            const croppedImg = await getCroppedImg(image.current, crop, "returnedFileName.jpg");
            const base64 = await blobToBase64(croppedImg)
            setCropped({
                base64,
                blob: croppedImg,
                done: false
            })
        } catch (ex) {

        }
    }

    async function handleCropDone() {
        setCropped(prevState => ({...prevState,
            done: true
        }))

    }


    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">Photo</h1>

            <h4 className="text-lg font-medium mt-2"> Add information about yourself</h4>

            <form onSubmit={handleSave}>

                <h3>Image preview</h3>

                <div className="border min-h-40 flex">
                    {!cropped?.done ? <CropImage ref={image} handleComplete={handleComplete} crop={crop} setCrop={setCrop} src={base64}/> : (
                        <div>
                            <img src={cropped.base64} alt=""/>
                        </div>
                    ) }
                </div>

                <div>
                    {base64 && <button type="button" onClick={handleCropDone}
                                       className="btn btn-primary2 mt-5 px-20">Crop</button>}
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