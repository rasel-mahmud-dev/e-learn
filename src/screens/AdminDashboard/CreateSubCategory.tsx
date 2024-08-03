import React, {useEffect, useState} from 'react';
import TextInput from "../../components/components/TextInput.tsx";
import {useAuthState} from "../../store/authState.ts";
import {api} from "../../apis";
import {useParams} from "react-router-dom";
import MultiSelect from "../../components/components/MultiSelect.tsx";
import {useAdminDashboardState} from "../../store/categoriesState.ts";

const formInputs = [
    {name: "Title", field: "title", helper: "", placeholder: "Enter title"},
    {name: "Image", field: "image", helper: "", placeholder: "Image Url"},
    {
        name: "Description",
        field: "description",
        as: "textarea",
        placeholder: "Enter Desc"
    },
]


type CategoryState = {
    title: string,
    description: string,
    image: string,
    categories: string[],
}

const CreateSubCategory = () => {

    const {updateSlug} = useParams()

    const {categories, fetchCategories} = useAdminDashboardState()

    const [state, setState] = useState<CategoryState>({})

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (updateSlug) {
            api.patch(`/sub-categories/${updateSlug}`, state).then(res => {
                console.log(res)
            })
        } else {
            api.post("/sub-categories", [state]).then(res => {
                console.log(res)
            })
        }
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    useEffect(() => {
        if (updateSlug) {
            api.get(`/sub-categories/one?slug=${updateSlug}`).then(res => {
                const data = res.data.data
                if (!data) return
                const updatedState: CategoryState = {} as CategoryState
                if (data.title) updatedState["title"] = data.title
                if (data.description) updatedState["description"] = data.description
                if (data.image) updatedState["image"] = data.image
                if (data.categories) updatedState["categories"] = data.categories
                setState(prevState => ({...prevState, ...updatedState}))
            })
        }
    }, [updateSlug])

    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">{updateSlug ? "Update " : "Create "} Sub Category</h1>
            <h4 className="text-lg font-medium mt-2"> Add information about category</h4>

            <form onSubmit={handleSave}>

                <div className="mt-8">

                    <MultiSelect
                        label="Categories"
                        multiple={true}
                        name="categories"
                        value={state.categories}
                        options={categories}
                        placeholder="Select categories"
                        optName={"title"}
                        onChange={handleChange}
                        optId={"id"}
                    />
                </div>

                {formInputs.map(input => (


                    <div className="mt-4">
                        <TextInput onChange={handleChange} name={input.field} label={input.name}
                                   placeholder={input.placeholder}
                                   value={state[input.field]}
                                   as={input.as}
                        />
                        {input.helper && <div className="text-xs pt-2">{input.helper}</div>}

                    </div>
                ))}


                <button className="btn btn-primary2 mt-5 px-20">{updateSlug ? "Update" : "Create"}</button>

            </form>


        </div>
    );
};

export default CreateSubCategory;