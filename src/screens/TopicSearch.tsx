import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {api} from "../apis";
import AllCourses from "../components/HomePage/AllCourses.tsx";
import TopCourse from "../components/HomePage/TopCourse.tsx";
import {useTopicDetail} from "../store/useTopicDetail.ts";
import topics from "./AdminDashboard/Topics/Topics.tsx";
import topicService from "../store/services/topicsService.ts";
import {FaUsers} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";
import {HiUsers} from "react-icons/hi";

interface CourseDetail {
    id: number;
    title: string;
    slug: string
    thumbnail?: string
    price: string
}

function TopicSearch() {

    const {fetchTopicDetail, detail, totalLearner} = useTopicDetail()

    let selectedCat = ""
    let selectType = "topics"

    const {topic, category, subCategory} = useParams()
    const [popularTopics, setPopularTopics,] = useState([])

    if (subCategory) {
        selectedCat = subCategory
        selectType = "subCategory"
    } else if (topic) {
        selectedCat = topic
        selectType = "topics"
    }


    const [courses, setCourses] = useState<CourseDetail[]>([]);

    useEffect(() => {
        if (!topic) return;
        topicService.storeTopicPref(topic)
        topicService.getPopularTopics().then(topics => {
            setPopularTopics(topics)
        })
        fetchTopicDetail(topic)
    }, [topic])

    useEffect(() => {
        if (!selectedCat) return;
        api.get("/api/v1/courses").then(res => {
            const courses = res.data?.data || []
            setCourses(courses)
        })
    }, [selectedCat])


    const tabs = {
        1: {
            label: "Most popular",
            render: <>
                <div>sdkfjsdf</div>
            </>
        },
        2: {
            label: "New",
            render: <>
                <div>sdkfjsdf</div>
            </>
        },
        3: {
            label: "Beginner Favorites",
            render: <>
                <div>sdkfjsdsdfsdfsdfsdff</div>
            </>
        }
    }

    const [selectedTab, setSelectedTab] = useState("1")

    return (
        <div className="container mx-auto p-6">
            <div className="  mb-8">


                {detail?.title
                    ? (
                        <>
                            <h1 className="text-4xl font-bold">{detail?.title} Courses</h1>
                            <p className="text-gray-600">JavaScript relates to <span className="font-bold">Development, IT & Software</span>
                            </p>
                        </>
                    )
                    : (
                        <>
                            <div className="skeleton rounded-none h-10 w-1/4"></div>
                            <div className="skeleton rounded-none h-4 w-2/4 mt-2"></div>
                        </>

                    )
                }


                <div className="flex items-center text-gray-600 gap-x-2 mt-2">
                    <HiUsers/>
                    {totalLearner !== undefined ? (
                        <p>{totalLearner.toLocaleString()} learners</p>
                    ) : (
                        <div className="skeleton rounded-none h-4 w-1/4  "></div>
                    )}
                </div>

            </div>


            <div className="mb-8">
                <h2 className="text-3xl font-bold">Courses to get you started</h2>
                <p className="text-gray-600">Explore courses from experienced, real-world experts.</p>
            </div>

            <div>
                <div className="rs-tabs mb-6">
                    {Object.keys(tabs).map((key) => (
                        <li onClick={() => setSelectedTab(key)}
                            className={`rs-tab rs-tab-bordered ${selectedTab === key ? "rs-tab-active" : ""}`}>{tabs[key].label}</li>
                    ))}
                </div>
                <div>
                    {tabs[selectedTab].render}
                </div>
            </div>

            {/*<div className="rs-tabs mb-6">*/}
            {/*    <li className="rs-tab rs-tab-bordered rs-tab-active">Most popular</li>*/}
            {/*    <li className="rs-tab rs-tab-bordered">New</li>*/}
            {/*    <li className="rs-tab rs-tab-bordered">Beginner Favorites</li>*/}
            {/*</div>*/}


            <div className="py-6">
                <h1 className="text-3xl font-bold">Popular topics</h1>
                <div className=" flex flex-wrap   pt-4 space-x-2">

                    {popularTopics.length === 0 &&
                        <div className="flex flex-wrap gap-2">
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                            <div className="border-gray-500 border-2 rounded-none  px-4 py-1 w-32 h-10 skeleton"></div>
                        </div>
                    }

                    {popularTopics?.map(tp => (
                        <Link to={`/topic/${tp.slug}`} className="border-gray-500 border-2 w-max px-4 py-1">
                            {tp.title}
                        </Link>
                    ))}
                </div>

            </div>

            <div className=" ">
                <h1 className="text-3xl font-bold">Popular Instructors</h1>
                <p className="text-gray-600">These real-world experts are highly rated by learners like you..</p>
            </div>

            <div className=" ">
                <TopCourse/>


            </div>


            <div>
                <h1 className="text-3xl font-bold">All Web Development courses</h1>
                <AllCourses/>
            </div>

        </div>
    )
}

export default TopicSearch
