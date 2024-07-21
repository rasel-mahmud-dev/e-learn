import React, {useState} from 'react';
import Popup from "../components/Popup.tsx";
import TextInput from "../components/TextInput.tsx";
import {api} from "../../apis";
import ToastService from "../../services/ToastService.tsx";
import RatingChooser from "./RatingChooser.tsx";

const AddReview = ({onClose, updateData, courseId}) => {


    const [review, setReview] = useState({
        rate: 1,
        title: "",
        summary: "",
        linkImages: ""
    });

    function handleChange(e) {
        setReview(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!courseId) return ToastService.openError("Something were wrong.")

            if (!review.title || !review.rate) {
                return ToastService.openError("Rate & title required.")
            }

            const response = await api.post("/api/v1/courses/add-review", {
                title: review.title,
                summary: review.summary,
                linkImages: review.linkImages,
                courseId,
                rate: Number(review.rate),
            })
            console.log(response)

        } catch (ex) {
            console.log(ex)
        }

        // if (!authId) return Toast.openError("Need to login.")
        //
        // if (!productId) return Toast.openError("Product not exist.")
        //
        // if(!review.title || !review.rate){
        //     return Toast.openError("Rate & title required.")
        // }
        //
        // if (updateData) {
        //     dispatch(updateReviewAction({
        //         ...review,
        //         productId,
        //         _id: updateData._id
        //     })).unwrap().then(() => {
        //         Toast.openSuccess("Review updated.")
        //         localStorage.removeItem("review-temp")
        //         onClose()
        //     }).catch(ex => {
        //         Toast.openError(ex)
        //     })
        //     return
        // }
        //
        // dispatch(addReviewAction({
        //     ...review,
        //     productId,
        // })).unwrap().then(() => {
        //     Toast.openSuccess("Review added.")
        //     localStorage.removeItem("review-temp")
        //     onClose()
        // }).catch(ex => {
        //     Toast.openError(ex)
        // })
    }

    return (
        <div>
            <Popup
                className="max-w-2xl w-[95%] bg-white !fixed top-1/4 overflow-y-auto"
                onClose={() => onClose()}
                isOpen={true}>


                <div>
                    <h2 className="text-2xl font-semibold mb-5">{updateData ? "Update" : "Submit"} Review</h2>

                    <form onSubmit={handleSubmit} className="">
                        <div className="grid grid-cols-1 ">

                            <div className="">
                                <div className="mt-2"></div>
                                <RatingChooser label="Rate" name="rate" className="py-4" onChange={handleChange}
                                               total={5}/>
                                <TextInput label="Title" name="title" value={review.title} onChange={handleChange}
                                           className="mb-4"/>

                                <TextInput as="textarea" label="Summary" name="summary" value={review.summary}
                                           className="mb-4"
                                           onChange={handleChange}/>

                            </div>
                            <div className="">
                                {/*<MultipleFileChooser*/}
                                {/*    required={true}*/}
                                {/*    mimeType={imageExtensions}*/}
                                {/*    name="images"*/}
                                {/*    fileHandler={fileCompress}*/}
                                {/*    multiple={true}*/}
                                {/*    uploadedImages={uploadedImages}*/}
                                {/*    label="Images"*/}
                                {/*    inputClass="bg-input-group"*/}
                                {/*    onChange={handleChange}*/}
                                {/*    labelClass="dark:text-white !mb-2"*/}
                                {/*    className={"mt-4"}*/}
                                {/*/>*/}


                                {/*<TextInput*/}
                                {/*    placeholder="comma seperate link"*/}
                                {/*    type="textarea"*/}
                                {/*    label="Image Link"*/}
                                {/*    name="linkImages"*/}
                                {/*    value={review.linkImages}*/}
                                {/*    onChange={handleChange}/>*/}
                            </div>


                        </div>

                            <button className="btn btn-primary2 mt-8"
                                    type="submit">{updateData ? "Update" : "Submit"} Review
                            </button>

                    </form>
                </div>


            </Popup>
        </div>
    );
};

export default AddReview;