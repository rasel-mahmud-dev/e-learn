import React, {useEffect, useState} from 'react';
import Input from "../Form/Input.jsx";
import RatingChooser from "./RatingChooser.tsx";
import MultipleFileChooser from "../Form/MultipleFileChooser/MultipleFileChooser.jsx";
import resizeImage from "../../utils/resizeImage.js";
import {api} from "../../axios/index.js";
import {imageExtensions} from "../../utils/constant/extension.js";

const ReviewForm = ({onSubmit, updateData}) => {

    const [review, setReview] = useState({
        title: "",
        rate: 0,
        summary: "",
        images: []
    });

    const [uploadedImages, setUploadedImages] = useState({})

    useEffect(() => {
        if (updateData) {
            let updateState = {...review}
            let updateUploadedImages = {...uploadedImages}
            for (let reviewKey in updateState) {
                if (updateData[reviewKey]) {

                    if (reviewKey === "images") {

                        updateData[reviewKey]?.forEach((el, index) => {
                            updateUploadedImages[index] = {url: el}
                        })

                    } else {
                        updateState[reviewKey] = updateData[reviewKey]
                    }

                }
            }

            setReview(updateState)
            setUploadedImages(updateUploadedImages)
        }
    }, [updateData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        let images = []
        for (let uploadedImagesKey in uploadedImages) {
            if (uploadedImages[uploadedImagesKey].url) {
                images.push(uploadedImages[uploadedImagesKey].url)
            }
        }
        onSubmit({...review, images: images});
    };

    function getFromLocalStorage() {
        let tempImages = localStorage.getItem("review-temp")
        tempImages = JSON.parse(tempImages)
        if (tempImages && typeof tempImages === "object") {
            return tempImages
        }
        return {}
    }

    useEffect(() => {
        setUploadedImages(prev => ({...prev, ...getFromLocalStorage()}))
    }, []);

    useEffect(() => {
        if (!review.images) return;

        (async function () {
            let updatedState = {...uploadedImages, ...getFromLocalStorage()}

            for (let image of review.images) {

                if (!uploadedImages[image.fileName]) {
                    try {
                        updatedState[image.fileName] = {isUploading: true, url: ""}
                        const result = await handleUploadImage("image", image.blob, "")
                        updatedState[image.fileName] = {
                            ...updatedState[image.fileName],
                            url: result || ""
                        }
                    } catch (ex) {
                        updatedState[image.fileName] = {
                            ...updatedState[image.fileName],
                            isError: true
                        }
                    } finally {
                        updatedState[image.fileName] = {
                            ...updatedState[image.fileName],
                            isUploading: false
                        }
                    }
                }
            }
            localStorage.setItem("review-temp", JSON.stringify(updatedState))
            setUploadedImages(p => ({...p, ...updatedState}))
        }())

    }, [review?.images]);


    const handleChange = async (e) => {
        const {name, value} = e.target;

        if (name === "linkImages") {
            const links = value?.split(",")
            if (links.length) {
                let updateUploadedImages = {...uploadedImages}
                links.forEach(link => {
                    let withoutQuery = link.split("?")?.[0]?.trim()
                    if (withoutQuery) {
                        updateUploadedImages[withoutQuery] = {url: withoutQuery}
                    }
                })
                setUploadedImages(updateUploadedImages)
            }
        } else {
            setReview(prevReview => ({
                ...prevReview,
                [name]: value
            }));

        }
    };

    console.log(review)

    function handleUploadImage(name, value, dir) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                if (value.instanceOf === File) {
                    throw Error("Invalid file")
                }

                if (value.size > 500000) {
                    throw Error("file should be less than 500kb")
                }

                const formData = new FormData()
                formData.append(value.name, value)
                formData.append("fileName", value.name)
                formData.append("dir", dir)

                const {data} = await api.post("/files/upload", formData)
                resolve(data?.url)

            } catch (e) {
                reject(e)
            }
        })
    }

    function fileCompress(base64) {
        return resizeImage({
            maxWidth: 1280,
            maxHeight: 760,
            src: base64,
            quality: 0.5,
        })
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold">{updateData ? "Update" : "Submit"} Review</h2>

            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">

                    <div className="">
                        <div className="mt-2"></div>
                        <RatingChooser
                            label="Rate"
                            name="rate"
                            labelClass="mb-4 font-semibold"
                            onChange={handleChange}
                            total={5}
                        />
                        <Input label="Title" name="title" value={review.title} onChange={handleChange}/>
                        <Input type="textarea" label="Summary" name="summary" value={review.summary}
                               onChange={handleChange}/>

                    </div>
                    <div className="">
                        <MultipleFileChooser
                            required={true}
                            mimeType={imageExtensions}
                            name="images"
                            fileHandler={fileCompress}
                            multiple={true}
                            uploadedImages={uploadedImages}
                            label="Images"
                            inputClass="bg-input-group"
                            onChange={handleChange}
                            labelClass="dark:text-white !mb-2"
                            className={"mt-4"}
                        />
                        <div>
                            <h4 className="text-xs font-semibold">Or</h4>
                            <Input placeholder="comma seperate link" type="textarea" label="Link" name="linkImages"
                                   value={review.linkImages}
                                   onChange={handleChange}/>
                        </div>
                    </div>


                </div>
                <div>
                    <button className="btn primary-btn" type="submit">{updateData ? "Update" : "Submit"} Review</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;