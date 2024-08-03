import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {api} from "../../../apis";
import TextInput from "../../../components/components/TextInput.tsx";
import MultiSelect from "../../../components/components/MultiSelect.tsx";
import {useAdminDashboardState} from "../../../store/categoriesState.ts";

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
    subCategories: Array<string>
}

const CreateTopic = () => {

    const {updateSlug} = useParams()

    const {subCategories, fetchSubCategories} = useAdminDashboardState()

    useEffect(() => {
        fetchSubCategories()
    }, []);

    const [state, setState] = useState<CategoryState>({})

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (updateSlug) {
            api.patch(`/topics/${updateSlug}`, state).then(res => {
                console.log(res)
            })
        } else {
            api.post("/topics", [state]).then(res => {
                console.log(res)
            })
        }
    }

    useEffect(() => {
        if (updateSlug) {
            api.get(`/topics/one?slug=${updateSlug}`).then(res => {
                const data = res.data.data
                if (!data) return
                const updatedState: CategoryState = {} as CategoryState
                if (data.title) updatedState["title"] = data.title
                if (data.description) updatedState["description"] = data.description
                if (data.image) updatedState["image"] = data.image
                if (data.subCategories) updatedState["subCategories"] = data.subCategories
                setState(prevState => ({...prevState, ...updatedState}))
            })
        }
    }, [updateSlug])

    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">{updateSlug ? "Update " : "Create "} Topics </h1>
            <h4 className="text-lg font-medium mt-2"> Add information about topic</h4>

            <form onSubmit={handleSave}>

                <div className="mt-8">

                    <MultiSelect
                        label="Sub Categories"
                        multiple={true}
                        name="subCategories"
                        value={state.subCategories}
                        options={subCategories ?? []}
                        placeholder="Select sub categories"
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

export default CreateTopic;