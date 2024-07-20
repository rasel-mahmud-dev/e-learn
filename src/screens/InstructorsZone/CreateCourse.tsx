import React, {useEffect, useState} from 'react';
import TextInput from "../../components/components/TextInput.tsx";
import {api} from "../../apis";
import {useAdminDashboardState} from "../../store/categoriesState.ts";
import ToastService from "../../services/ToastService.tsx";
import axiosError from "../../utils/axiosError.ts";
import {useParams} from "react-router-dom";
import MultiSelect from "../../components/components/MultiSelect.tsx";
import {parseArrayInt} from "../../utils/transformer.ts";


const formInputs = {
    Basics: [
        {name: "Course Title", field: "title", helper: ""},
        {
            name: "Description",
            field: "description",
            as: "textarea"
        },
        {name: "Language", field: "language", helper: ''}
    ],

    Price: [
        {name: "Price", field: "price", helper: ""},
    ],

    Photo: [
        {name: "Photo", field: "thumbnail", helper: ""},
    ],

    "Category & Topics": [
        {
            optionState: "categories",
            multiple: true,
            optName: "title",
            optId: "id",
            name: "Category",
            field: "category",
            as: "select",
            placeholder: "Choose  category"
        },
        {
            optionState: "subCategories",
            name: "Sub Category",
            field: "subCategory",
            multiple: true,
            optName: "title",
            optId: "id",
            as: "select",
            placeholder: "Choose category"
        },
        {
            optionState: "topics",
            multiple: true,
            name: "Topics",
            optName: "title",
            optId: "id",
            field: "topic",
            as: "select",
            placeholder: "Choose topic"
        }
    ],

    Links: [
        {name: "Website", field: "website", placeholder: "Website (http(s)://..)"}
    ]
}


const CreateCourse = () => {
    const [course, setCourse] = useState({
        id: '',
        thumbnail: '',
        title: '',
        description: '',
        price: '',
        category: [],
        subCategory: [],
        topic: []
    });

    const {slug} = useParams()

    const {
        categories,
        fetchCategories,
        fetchSubCategories,
        fetchTopics,
        subCategories,
        topics
    } = useAdminDashboardState()

    useEffect(() => {
        fetchCategories()
        fetchSubCategories()
        fetchTopics()
    }, []);


    useEffect(() => {
        if (slug) {
            api.get(`/api/v1/instructor/courses/${slug}`).then(res => {
                if (res.data?.data) {
                    const {
                        id,
                        thumbnail,
                        title,
                        description,
                        price,
                        categoryList,
                        subCategoryList,
                        topicList,
                    } = res.data.data

                    setCourse({
                        id,
                        thumbnail,
                        title,
                        description,
                        price,
                        category: categoryList,
                        subCategory: subCategoryList,
                        topic: topicList
                    });
                }
            })
        }
    }, [slug]);

    const optionState = {
        categories,
        subCategories,
        topics,
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (slug && course.id) {
                await api.patch(`/api/v1/instructor/courses/${course.id}`, {
                    thumbnail: course.thumbnail,
                    title: course.title,
                    description: course.description,
                    price: Number(course.price),
                    categories: parseArrayInt(course?.category),
                    subCategories: parseArrayInt(course?.subCategory),
                    topics: parseArrayInt(course?.topic)
                });

                console.log("added.")

            } else {
                await api.post("/api/v1/instructor/courses", {
                    thumbnail: course.thumbnail,
                    title: course.title,
                    description: course.description,
                    price: Number(course.price),
                    categories: parseArrayInt(course?.category),
                    subCategories: parseArrayInt(course?.subCategory),
                    topics: parseArrayInt(course?.topic)
                });
                console.log("added.")
            }

        } catch (ex) {
            const msg = axiosError(ex);
            ToastService.openError(msg)

        }
    };

    console.log(parseArrayInt(["234", 23, 23, {}]))

    return (
        <div className="container w-full mx-auto">
            <h1 className="text-4xl font-semibold">Create new Course</h1>
            <h4 className="text-lg font-medium mt-2">Add information about course</h4>

            <form onSubmit={handleSubmit}>

                {Object.keys(formInputs).map(key => {
                    const value = formInputs[key];
                    return (
                        <div key={key} className="mt-5">
                            <h3 className="text-base font-semibold">{key}</h3>
                            <div>

                                {value.map(input => input.as == "select" ? (
                                    <div className="mt-4">

                                        <MultiSelect
                                            options={optionState[input.optionState] || []}
                                            multiple={input.multiple}
                                            value={course[input.field]}
                                            label={input.name}
                                            onChange={handleChange}
                                            name={input.field}
                                            optId={input.optId}
                                            optName={input.optName}
                                            placeholder={input.placeholder}
                                        />


                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <TextInput onChange={handleChange} name={input.field} label={input.name}
                                                   placeholder={input.placeholder}
                                                   value={course[input.field]}
                                                   as={input.as}
                                        />
                                        {input.helper && <div className="text-xs pt-2">{input.helper}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}

                <button className="btn btn-primary2 mt-5 px-20">Create</button>

            </form>


        </div>
    );
};

export default CreateCourse;