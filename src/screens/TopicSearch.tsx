import { useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {api} from "../apis";
import AllCourses from "../components/HomePage/AllCourses.tsx";
import TopCourse from "../components/HomePage/TopCourse.tsx";

interface CourseDetail {
    id: number;
    title: string;
    slug: string
    thumbnail?: string
    price: string
}

function TopicSearch() {


    let selectedCat = ""
    let selectType = "topics"

    const {topic, category, subCategory} = useParams()

    if (subCategory) {
        selectedCat = subCategory
        selectType = "subCategory"
    } else if (topic) {
        selectedCat = topic
        selectType = "topics"
    }


    const [courses, setCourses] = useState<CourseDetail[]>([]);

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
                <h1 className="text-4xl font-bold">{selectedCat} Courses</h1>
                <p className="text-gray-600">JavaScript relates to <span className="font-bold">Development, IT & Software</span>
                </p>
                <p className="text-gray-600"><i className="fas fa-users"></i> 16,746,775 learners</p>
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


            <div className=" ">
                <h1 className="text-3xl font-bold">Popular topics</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cum iusto laboriosam laborum nulla odio porro rerum, sequi? Amet aperiam assumenda debitis dignissimos doloremque error fugiat illo ipsam laudantium maxime minus nemo nisi nulla, odit officia officiis optio, placeat quidem quos reiciendis rem rerum totam veniam veritatis vitae, voluptatibus voluptatum. Alias autem cupiditate dolor doloribus ducimus enim facere facilis mollitia quae voluptates? Aperiam dicta expedita inventore quos temporibus. Aperiam cum debitis deserunt doloremque earum iure magnam obcaecati quaerat ut. Culpa cumque debitis ducimus fuga fugit nulla odio quam quo quod recusandae? A consequatur debitis dicta dolore dolorem dolorum illo ipsam itaque libero magnam nam natus nobis non pariatur placeat reprehenderit, repudiandae sapiente sed tenetur, voluptates? Architecto dignissimos illo illum magni omnis reiciendis sunt veritatis vitae? Aliquam autem commodi consequuntur ea eligendi eum excepturi hic, impedit ipsa, labore odio odit perspiciatis quaerat quam, quidem quisquam temporibus voluptatem. A architecto blanditiis commodi delectus dicta dolorem ea est exercitationem facere laborum laudantium molestias natus nesciunt nihil nulla numquam odio, omnis pariatur porro praesentium quam quasi quidem quis quo soluta tempore tenetur totam veritatis voluptate voluptatum? Accusantium aut expedita explicabo quia quidem suscipit, voluptate! Aliquid dignissimos maiores minima pariatur placeat quae quibusdam quod recusandae rerum veritatis. Aperiam, delectus dolores dolorum exercitationem iusto officia quas similique voluptatum! Aliquam asperiores corporis cupiditate distinctio et, expedita illo ipsam laboriosam, laudantium magni obcaecati rerum sequi tenetur veritatis, voluptates! Aut expedita iure mollitia natus nesciunt, obcaecati perferendis quidem tempora vel voluptas? A accusamus adipisci aliquid amet aperiam asperiores corporis cumque deserunt dicta dolorem earum eos eum excepturi harum illum iste iure libero magni maiores minima molestias, mollitia natus nesciunt nisi non obcaecati optio possimus quasi quis quisquam repellendus sint sit sunt tempora vero voluptate voluptates? Accusantium aliquam amet architecto corporis culpa dolorum ea earum esse ex hic id impedit iste labore laudantium minima minus molestias nam, necessitatibus nesciunt nisi obcaecati praesentium quae quaerat sed temporibus ullam vel voluptatum. Accusamus accusantium debitis esse et, inventore ipsum voluptatem voluptates. Doloremque esse nostrum soluta suscipit? Aliquam cum ea laboriosam laudantium obcaecati odio pariatur placeat repellat repellendus, totam. Accusantium adipisci aperiam assumenda, aut culpa dolore doloremque esse molestias numquam odio quas quod tenetur vitae. Architecto, ex ipsum laboriosam libero nesciunt nisi officia ratione suscipit totam, veniam vero vitae. Adipisci, aperiam beatae corporis doloremque enim inventore nesciunt obcaecati officiis possimus, quis quisquam repudiandae similique velit. Amet animi aperiam at blanditiis commodi cum distinctio dolor doloribus ea eaque eius eligendi ex harum illum iste labore modi nesciunt, nobis nulla obcaecati qui quidem repellendus reprehenderit saepe, sed suscipit temporibus tenetur totam veniam voluptate. Adipisci aspernatur consectetur culpa debitis dicta et, facere fugit illum magnam, nihil nostrum perspiciatis rem repellat repellendus sint tenetur voluptate. Dolorem doloribus ipsum, iure magnam nam nobis qui. Aliquam cum nobis perspiciatis praesentium quaerat velit voluptatem! Distinctio ea eum iste molestiae, molestias nesciunt omnis qui quibusdam quidem quisquam quod unde velit vero. Accusamus at culpa deleniti distinctio, exercitationem ipsam nesciunt, nihil nobis possimus quasi quod vel voluptas voluptate? Accusamus dicta dolorem ex facere.</p>
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
