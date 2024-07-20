import React, {useEffect, useState} from 'react';
import TextInput from "../../components/components/TextInput.tsx";
import {api} from "../../apis";
import {useAdminDashboardState} from "../../store/categoriesState.ts";
import ToastService from "../../services/ToastService.tsx";
import axiosError from "../../utils/axiosError.ts";


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
        {optionState: "categories", name: "Category", field: "category", as: "select", placeholder: "Choose  category"},
        {
            optionState: "subCategories",
            name: "Sub Category",
            field: "subCategory",
            as: "select",
            placeholder: "Choose category"
        },
        {optionState: "topics", name: "Topics", field: "topic", as: "select", placeholder: "Choose topic"}
    ],

    Links: [
        {name: "Website", field: "website", placeholder: "Website (http(s)://..)"}
    ]
}


const CreateCourse = () => {
    const [course, setCourse] = useState({
        thumbnail: '',
        title: '',
        description: '',
        authorId: '',
        price: '',
        category: '',
        subCategory: '',
        topic: ''
    });

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
            await api.post("/api/v1/courses", {
                "thumbnail": course.thumbnail,
                "title": course.title,
                "description": course.description,
                "price": Number(course.price),
                categoryId: Number(course?.category || 0),
                subCategoryId: Number(course?.subCategory || 0),
                topicId: Number(course?.topic || 0)
            });
            console.log("added.")
            setCourse({})
        } catch (ex) {
            const msg = axiosError(ex);
            ToastService.openError(msg)
            console.log(ex)
        }
    };


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
                                        <label className="block " htmlFor={input.id}>{input.name}</label>
                                        <select className="select select-success" onChange={handleChange}
                                                name={input.field} id={input.id}>

                                            {optionState?.[input.optionState]?.map(otp => (
                                                <option key={otp.id} value={otp.id}>{otp.title}</option>
                                            ))}

                                        </select>
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