import React, {useEffect, useState} from 'react';
import {useTopCourses} from "../../store/useTopCourses.ts";
import {Link} from "react-router-dom";
import Rate from "../Reviews/Rate.tsx";
import HorizontalStyle from "../Course/HorizontalStyle.tsx";
import {FaFilter} from "react-icons/fa";
import TextInput from "../components/TextInput.tsx";
import MultiSelect from "../components/MultiSelect.tsx";
import {useAdminDashboardState} from "../../store/categoriesState.ts";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";

const AllCourses = () => {

    const {courses, fetchTopCourses} = useTopCourses()

    const [openFilterSidebar, setOpenFilterSidebar] = useState<boolean>(true)

    useEffect(() => {
        fetchTopCourses()
    }, [fetchTopCourses]);

    const [expandFilterSections, setExpandFilterSections] = useState<string>(["Ratings", "Video Duration"])

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold  ">All Web Development courses</h2>
            <p className="text-gray-500 mb-8 mt-4">
                Each aspect of creating websites and applications entails a unique set of skills. Udemy offers a host of
                courses <br/>
                to bring you up to speed on modern front-end, back-end, and fullstack web development practices and
                skills.
            </p>

            <div className="flex items-center gap-x-3">
                <button onClick={() => setOpenFilterSidebar(prev => !prev)}
                        className="flex items-center btn btn-black ">
                    {<FaFilter/>}
                    <span>Filter</span>
                </button>

                <div>
                    <MultiSelect
                        multiple={false}
                        optName="name"
                        inputClassName="!pb-0 !pt-4"
                        optId="id"
                        label="Sort By"
                        options={[
                            {name: "Most Popular", id: 1},
                            {name: "Highest Rated", id: 2},
                            {name: "Newest", id: 3},
                        ]}
                        className="py-3"
                        la
                        value={"SDFFFFFFFF"}
                        onChange={"handleChange"}
                        name={"input.field"}
                    />
                </div>

            </div>

            <div className="flex gap-x-4">
                {openFilterSidebar && <FilterSidebar expandFilterSections={expandFilterSections}
                                                     setExpandFilterSections={setExpandFilterSections}/>}
                <div className="">
                    {courses.map((course) => (
                        <Link to={`/course/${course.slug}`}>
                            <div className=" border-b mt-4 pb-4 border-gray-300">
                                <HorizontalStyle
                                    key={course.id}
                                    thumbnail={"https://img-b.udemycdn.com/course/480x270/6048973_c5b2_15.jpg"}
                                    title={course.title}
                                    authorName={course.price}
                                    price={course.price}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>


        </div>
    );
};

function FilterSidebar({expandFilterSections, setExpandFilterSections}) {

    const languages = [
        {title: "English", count: 566},
        {title: "Español", count: 142},
        {title: "Português", count: 91},
        {title: "Türkçe", count: 62},
        {title: "Français", count: 47},
        {title: "العربية", count: 26},
        {title: "Русский", count: 21},
        {title: "हिन्दी", count: 17},
        {title: "Deutsch", count: 15},
        {title: "Italiano", count: 15},
        {title: "Polski", count: 15},
        {title: "中文", count: 15},
        {title: "日本語", count: 14},
        {title: "한국어", count: 13},
        {title: "Bahasa Indonesia", count: 11},
        {title: "ภาษาไทย", count: 5},
        {title: "اردو", count: 4},
        {title: "தமிழ்", count: 2},
        {title: "Tiếng Việt", count: 2},
        {title: "Azərbaycan dili", count: 1},
        {title: "Ελληνικά", count: 1},
        {title: "‏עברית‏", count: 1},
        {title: "Қазақша", count: 1},
        {title: "Malayāḷam", count: 1},
        {title: "Română", count: 1},
        {title: "Kiswahili", count: 1},
        {title: "Telugu", count: 1},
        {title: "Українська", count: 1}
    ];
    const labels = [
        {title: "All Levels", id: "all"},
        {title: "Beginner", id: "beginner"},
        {title: "Beginner", id: "beginner"},
        {title: "Beginner", id: "beginner"},
        {title: "Beginner", id: "beginner"},
    ];

    const price = [
        {title: "Free", id: "free"},
        {title: "Paid", id: "paid"},
    ];
    const videoDuration = [
        {title: '0-1 Hour', count: 107, value: 'extraShort'},
        {title: '1-3 Hours', count: 269, value: 'short'},
        {title: '3-6 Hours', count: 206, value: 'medium'},
        {title: '6-17 Hours', count: 308, value: 'long'},
        {title: '17+ Hours', count: 202, value: 'extraLong'},
    ];

    const ratings = [
        {label: '4.5 & up', count: 422, value: 4.5},
        {label: '4.0 & up', count: 782, value: 4.0},
        {label: '3.5 & up', count: 951, value: 3.5},
        {label: '3.0 & up', count: 980, value: 3.0},
    ];

    const {subCategories, fetchSubCategories, fetchTopics, topics} = useAdminDashboardState()

    useEffect(() => {
        fetchSubCategories()
        fetchTopics()
    }, []);

    const items = [
        {label: "Ratings", data: ratings, render: RenderRatingItem},
        {label: "Video Duration", data: videoDuration, render: RenderVideoDurationItem},
        {label: "Topic", data: topics, render: RenderItem},
        {label: "SubCategory", data: subCategories, render: RenderItem},
        {label: "Label", data: labels, render: RenderItem},
        {label: "Language", data: languages, render: RenderItem},
        {label: "Price", data: price, render: RenderItem},
        // {label: "Features", data: languages},
        // {label: "Subtitles", data: languages},

    ]

    function handleToggleExpandFilterItem(name: string) {
        setExpandFilterSections(prev => prev.includes(name) ? prev.filter(el => el !== name) : [...prev, name])
    }


    return (
        <div className="w-[400px]   mt-4">
            <div className="p-4">
                {items.map(item => (
                    <div className="py-2">
                        <div onClick={() => handleToggleExpandFilterItem(item.label)}
                             className="flex items-center justify-between   ">
                            <h4 className="text-lg  text-gray-900 font-semibold">{item.label}</h4>

                            {expandFilterSections.includes(item.label) ? (
                                <BsChevronUp
                                    className="text-xs"/>
                            ) : (
                                <BsChevronDown
                                    className="text-xs"/>

                            )}
                        </div>
                        {expandFilterSections.includes(item.label) && <div className="mt-2">
                            {item.data?.map(el => {
                                const RenderComp = item.render
                                return <RenderComp item={el} key={el.id}/>
                            })}
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

function RenderItem({item}) {
    return (

        <label key={item.value} className="label flex items-center justify-start gap-x-2 cursor-pointer">
            <input
                type="checkbox"
                value={item.value}
                className="checkbox checkbox-sm checkbox-success"
            />
            <span className="label-text">{`${item.title} (${item.count})`}</span>

        </label>


    )
}

function RenderVideoDurationItem({item}) {
    return (
        <label key={item.value} className="label flex items-center justify-start gap-x-2 cursor-pointer">
            <input
                type="checkbox"
                value={item.value}
                className="checkbox checkbox-sm checkbox-success"
            />
            <span className="label-text">{`${item.title} (${item.count})`}</span>

        </label>
    )
}

function RenderRatingItem({item}) {
    return (
        <label key={item.value} className="label cursor-pointer flex justify-start items-center space-x-2">
            <input
                type="radio"
                name="rating"
                value={item.value}
                className="radio radio-sm radio-primary"
            />
            <span className="flex items-center space-x-1">

                <span className="text-yellow-500">
                  {'★'.repeat(Math.floor(item.value)) + '☆'.repeat(5 - Math.floor(item.value))}
                </span>

                <span>{item.label}</span>
                <span className="text-gray-500">{`(${item.count})`}</span>
              </span>
        </label>
    )
}


export default AllCourses;