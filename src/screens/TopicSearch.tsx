import {Link, useParams} from "react-router-dom";
import {useCategoryState} from "../store/categoriesState.ts";
import {useEffect, useMemo, useState} from "react";
import {api} from "../apis";
import Tab from "../components/Tab/Tab.tsx";

interface CourseDetail {
    id: number;
    title: string;
    slug: string
    thumbnail?: string
    price: string
}

function TopicSearch() {

    const { topics} = useCategoryState()

    const { topic }  = useParams()

    const selectedTopic = useMemo(() =>  topics.find((x) => x.slug === topic), [topic, topics]);
    const [courses, setCourses] = useState<CourseDetail[]>([]);

    useEffect(()=>{
        if(!selectedTopic) return;


        api.get("/course").then(res=>{
            const courses = res.data
            setCourses(courses)
        })

    }, [selectedTopic])


    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">{selectedTopic?.title} Courses</h1>
                <p className="text-gray-600">JavaScript relates to <span className="font-bold">Development, IT & Software</span>
                </p>
                <p className="text-gray-600"><i className="fas fa-users"></i> 16,746,775 learners</p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold">Courses to get you started</h2>
                <p className="text-gray-600">Explore courses from experienced, real-world experts.</p>
            </div>

            <div className="tabs mb-6">
                <a className="tab tab-bordered tab-active">Most popular</a>
                <a className="tab tab-bordered">New</a>
                <a className="tab tab-bordered">Beginner Favorites</a>
            </div>

            <div className="tabs mb-6">
                <Tab />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {courses?.map((course) => (
                    <Link to={`/course/${course.slug}`} className="cardf bg-white  hover:shadow-lg transition-shadow">
                        <figure className="">
                            <img src={course.thumbnail} alt="JavaScript Course"
                                 className="  w-full"/>
                        </figure>
                        <div className="p-3">
                            <h2 className="card-title">{course.title}</h2>
                            <p className="text-gray-600">Jonas Schmedtmann</p>
                            <p className="text-gray-800 font-bold">${course.price}</p>
                            <div className="badge badge-primary">Bestseller</div>
                            <p className="mt-2">Rating: 4.7 (208,803)</p>
                        </div>
                    </Link>

                ))}


            </div>
        </div>
    )
}

export default TopicSearch
