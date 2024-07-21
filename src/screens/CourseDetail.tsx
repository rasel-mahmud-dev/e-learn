import React, {useEffect, useState} from 'react';

import {Link, useParams} from "react-router-dom";
import {api} from "../apis";
import Reviews, {Review} from "../components/Reviews/Reviews.tsx";
import Rating from "../components/Reviews/Rating.tsx";
import AddReview from "../components/Reviews/AddReview.tsx";
import {Course} from "../types/course.ts";
import BottomSheet from "../components/Reviews/BottomSheet.tsx";
import RslPagination from "../components/Pagination/Pagination.tsx";

const CourseDetail = () => {

    const {slug} = useParams()
    const [course, setCourse] = useState<Course>();

    const [openAddReviewForm, setOpenAddReviewForm] = useState(false)
    const [reviewInfo, setReviewInfo] = useState<{
        reviews: Array<Review>,
        avgRating: number,
        total: number
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number,
    }>({
        reviews: [],
        avgRating: 0,
        total: 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
    })

    function fetchCourseReviews(courseId: string) {
        api.get(`/api/v1/courses/reviews/${courseId}`).then(res => {
            if (res?.data?.data) {
                const avgRating = res.data?.data?.avgRating
                const total = res.data?.data?.total
                const state = {
                    ...reviewInfo,
                    reviews: res.data?.data?.reviews,
                    "1": res.data?.data?.["1"] || 0,
                    "2": res.data?.data?.["2"] || 0,
                    "3": res.data?.data?.["3"] || 0,
                    "4": res.data?.data?.["4"] || 0,
                    "5": res.data?.data?.["5"] || 0,
                }
                if (avgRating) {
                    state.avgRating = avgRating
                }
                if (total) {
                    state.total = total
                }
                setReviewInfo(state);

            }
        })

    }

    useEffect(() => {
        if (!slug) return

        api.get(`/api/v1/instructor/courses/${slug}`).then(res => {
            if (res.data?.data) {
                setCourse(res.data?.data);
                fetchCourseReviews(res.data?.data.courseId)
            }
        })

    }, [slug])

    const [openDetailReview, setOpenDetailReview] = useState(null)


    if (!course) return <h2>No, detail.</h2>

    return (

        <div className="container py-6 flex flex-col justify-center sm:py-12">

            <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1">
                        <div className="p-4">
                            <h1 className="text-3xl font-bold">{course.title}</h1>
                            <p className="text-gray-600 mt-2">{course.description}</p>
                            <div className="flex items-center mt-3">
                                    <span className="text-yellow-500 mr-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.539 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.783.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.16 9.384c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.957z"/></svg>
                                    </span>
                                <span className="text-gray-700 text-sm"><strong>4.3</strong> (4,450 ratings) • 297,664 students</span>
                            </div>
                            <div className="mt-4 text-gray-600">
                                <p>Created by EdYoda for Business, Qaifi Khan</p>
                                <p>Last updated 6/2020 • English • English [Auto]</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6">
                        <div className="bg-gray-50 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                            <div>
                                <img src={course.thumbnail} alt=""/>
                            </div>

                            <div className="p-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold">${course.price}</p>


                                    <button
                                        className="mt-3 px-4 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700">Add
                                        to cart
                                    </button>
                                    <button
                                        className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md shadow-md hover:bg-gray-300">Buy
                                        now
                                    </button>
                                    <p className="mt-4 text-sm text-gray-500">30-Day Money-Back Guarantee</p>
                                </div>
                                <div className="mt-6 text-sm">
                                    <p>This course includes:</p>
                                    <ul className="list-disc list-inside mt-2">
                                        <li>10 hours on-demand video</li>
                                        <li>20 downloadable resources</li>
                                        <li>Access on mobile and TV</li>
                                        <li>Full lifetime access</li>
                                        <li>Certificate of completion</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">What you'll learn</h2>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>Basics of JavaScript (Data types, Loops, Arrays, Objects, Functions, etc)</li>
                        <li>OOPs concepts in JavaScript</li>
                        <li>Introduction to Document Object Model(DOM) and Browser Object Model(BOM) in Java</li>
                        <li>Working with jQuery</li>
                    </ul>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Course content</h2>
                    <div className="mt-4">
                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-4 bg-gray-100 font-semibold">JavaScript Basics</div>
                            <div className="p-4">
                                <ul className="list-inside text-gray-700">
                                    <li className="flex justify-between py-2 border-b border-gray-200">
                                        <span>JavaScript - Introduction</span>
                                        <span>02:53</span>
                                    </li>
                                    <li className="flex justify-between py-2 border-b border-gray-200">
                                        <span>JavaScript - Introduction to Variables, Operators and Expressions</span>
                                        <span>07:42</span>
                                    </li>
                                    <li className="flex justify-between py-2">
                                        <span>JavaScript - Variables</span>
                                        <span>08:04</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {openAddReviewForm && (
                <div>

                    <AddReview
                        courseId={course.courseId}
                        onClose={() => setOpenAddReviewForm(prevState => !prevState)}
                    />

                </div>
            )}

            <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold ">Rating</h2>
                </div>
                <Rating
                    onClickOpenReviewForm={setOpenAddReviewForm}
                    reviews={reviewInfo.reviews}
                    totalReviews={reviewInfo.total}
                    rating={{
                        1: reviewInfo["1"],
                        2: reviewInfo["2"],
                        3: reviewInfo["3"],
                        4: reviewInfo["4"],
                        5: reviewInfo["5"],
                    }}
                    avgRating={reviewInfo.avgRating}
                    className={""}
                    onClickEdit={() => {
                    }}
                    onClickDelete={() => {
                    }}/>
            </div>

            <div className="relative p-8 bg-white shadow-sm sm:rounded-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold ">Reviews</h2>
                    <button onClick={() => setOpenDetailReview(true)} className="btn btn-primary2">More</button>
                </div>
                <Reviews
                    reviews={reviewInfo.reviews}
                    className={""}
                    onClickEdit={() => {
                    }}
                    onClickDelete={() => {
                    }}/>

                <BottomSheet isOpen={openDetailReview} onClose={() => setOpenDetailReview(null)}>

                    <div className="max-w-2xl mx-auto mt-4">

                        <h2 className="text-3xl font-semibold text-center mb-6">Reviews</h2>

                        <div className="sheet-content  ">
                            <Reviews
                                reviews={reviewInfo.reviews}
                                className={""}
                                onClickEdit={() => {
                                }}
                                onClickDelete={() => {
                                }}/>

                        </div>
                        <div className="sheet-content-pagination">
                            <RslPagination currentPage={1} onChange={() => {
                            }} className="" perPageRow={10} totalItem={100}/>
                        </div>

                    </div>

                </BottomSheet>
            </div>

        </div>
    )

};

export default CourseDetail;