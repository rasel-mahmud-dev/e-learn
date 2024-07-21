import React, {FC} from 'react';
import {BiCheck, BiStar} from "react-icons/bi";
import getAssetPath from "../../utils/getAssetPath.ts";
import Image from "../Image/Image"
import "./style.scss"
import {showDateTime} from "../../utils/date.ts";

export type Review = {
    rate: number,
    title: string,
    summary: string,
    images: []
    username: string,
    createdAt: string
    avatar: string
}

type ReviewsProps = {
    reviews: Array<Review>
    className: string
    isModAble: boolean
    onClickEdit: any
    onClickDelete: any
}

const Reviews: FC<ReviewsProps> = ({reviews, className, isModAble = false, onClickEdit, onClickDelete}) => {
    return (
        <div className={className}>
            {reviews.map((review) => (
                <div className="rs-rating bg-white p-4 rounded-lg my-2">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="rating_badge">
                                <span>{review?.rate}</span>
                                <BiStar/>
                            </div>
                            <h4 className="ml-2 font-medium">{review?.title}</h4>
                        </div>
                        {isModAble && <div className="flex items-center gap-x-2">
                            <button onClick={() => onClickEdit(review)} className="btn btn-outline">Edit</button>
                            <button onClick={() => onClickDelete(review)} className="btn btn-outline">Delete</button>
                        </div>}
                    </div>

                    <p className="text-sm text-gray-500 mt-2 whitespace-pre-line">{review?.summary}</p>

                    <div className="flex gap-1 mt-4 flex-wrap">
                        {review?.images?.map(img => (
                            <Image imgClass="object-cover w-20 h-20 !rounded" className=" " key={img}
                                   src={getAssetPath(img)}/>
                        ))}
                    </div>


                    <div className="mt-3">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex  items-center text-sm gap-x-4">
                                <div className="flex items-center text-sm font-semibold text-neutral-700 gap-x-1  ">
                                    <Image imgClass="w-6 h-6 border" fallbackLetter={true}
                                           src={getAssetPath(review?.avatar)}/>
                                    <h4>{review?.username}</h4>
                                </div>

                            </div>

                            <div
                                className="text-neutral-500 text-xs ml-2 date">{showDateTime(review?.createdAt)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;