import React, {useEffect, useState} from 'react';
import {api} from "../apis";
import {useParams} from "react-router-dom";

const CourseDetail = () => {

    const {slug} = useParams()
    const [course, setCourse] = useState([]);

    useEffect(() => {
        if (!slug) return
        api.get(`/course/detail/${slug}`).then(res => {
            setCourse(res.data);
        })
    }, [slug])


    if (!course) return <h2>No, detail.</h2>

    return (

        <div className="bg-gray-100 min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-5xl sm:mx-auto w-full">
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
            </div>
        </div>
    )

};

export default CourseDetail;