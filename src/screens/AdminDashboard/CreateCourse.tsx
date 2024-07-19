import React, {useState} from 'react';
import {api} from "../../apis";

const CreateCourse = () => {
    const [course, setCourse] = useState({
        thumbnail: '',
        title: '',
        description: '',
        authorId: '',
        price: ''
    });

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
            await api.post("/course", {
                "thumbnail": course.thumbnail,
                "title": course.title,
                "description": course.description,
                "authorId": 2,
                "price": Number(course.price),
            });
            console.log("added.")
            setCourse({})
        } catch (ex) {
            console.log(ex)
        }
    };

    return (
        <div className="container mx-auto p-4">

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                <h3 className="text-3xl font-bold mb-4">Create Course</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="thumbnail">Thumbnail</label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={course.thumbnail}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Thumbnail URL"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Description"
                    ></textarea>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Price"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourse;