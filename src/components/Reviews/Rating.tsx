import React from "react";
import {BiStar} from "react-icons/bi";


const Rating = ({onClickOpenReviewForm, rating, totalReviews, avgRating}) => {
    const ratingGroup = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    }

    const classGrade = {
        A: [100, 80],
        B: [80, 60],
        C: [60, 40],
        D: [40, 20],
        H: [20, 10],
        I: [10, 0]
    }

    function setClasses(rate: number) {
        const percent = Math.round((rating[rate] * 100) / totalReviews);
        let out = "color_grade_"
        for (let classGradeKey in classGrade) {
            const val = classGrade[classGradeKey]
            if (percent <= val[0] && percent >= val[1]) {
                out = "color_grade_" +classGradeKey
                break
            }
        }
        return out
    }

    return (
        <div className="mt-6">


            <div className="flex items-center justify-between">
                <h1 className="sec_label font-semibold text-2xl">Ratings & Reviews</h1>
                <button onClick={() => onClickOpenReviewForm(prev => !prev)} className="btn btn-primary2">Rate Now
                </button>
            </div>


            <div>
                <div className="flex mt-5 justify-between">

                    <div className="px-1 md:px-1 w-5/12 justify-center flex flex-col">
                        <div className=" flex items-center  justify-center font-bold text-4xl">
                            <span className="block font-bold text-5xl">{Number(avgRating).toFixed(1)}</span>
                            <BiStar/>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <h4 className="text-grey fs-14 mt-5 flex"> {totalReviews} Ratings</h4>
                            <h4 className="text-grey fs-14 text-center">&</h4>
                            <h4 className="text-grey fs-14 flex">Reviews</h4>
                        </div>
                    </div>

                    <div className="ml-1 md:ml-10 w-full">

                        {Object.keys(ratingGroup).map(rate => (
                            <div className="rate w-full" key={rate}>
                                <div className="flex items-center bg-transparent rating-star ">
                                    <span className="w-3">{rate}</span>
                                    <BiStar title=""/>
                                </div>
                                <span className={`user_rate-wrapper ${setClasses(rate)}`}>
                                    <div style={{width: (rating[rate] * 100) / totalReviews + "%"}}
                                         className="user_rate"/>
                                </span>
                                <span className="rate-amount text-grey fs-14 ml-5">{rating[rate]}</span>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="mt-5">
                    {/*<h4 className="text-base font-semibold">Customer Gallery</h4>*/}
                    {/*<div className="flex flex-wrap gap-1 mt-2">*/}
                    {/*{customerGallery?.map(img => (*/}
                    {/*    <Image imgClass="object-cover w-10 h-10 !rounded" className=" " key={img}*/}
                    {/*           src={getAssetPath(img)}/>*/}
                    {/*))}*/}
                    {/*</div>*/}

                </div>
            </div>


        </div>
    );
};

export default Rating