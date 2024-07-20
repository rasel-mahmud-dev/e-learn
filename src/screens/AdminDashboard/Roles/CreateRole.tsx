import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../apis";
import TextInput from "../../../components/components/TextInput.tsx";

const formInputs = [
    {name: "Name", field: "name", helper: "", placeholder: "Enter name"},
    {
        name: "Description",
        field: "description",
        as: "textarea",
        placeholder: "Enter Desc"
    },
]


type CategoryState = {
    name: string,
    description: string,
}

const CreateRole = () => {

    const {updateSlug} = useParams()

    const navigate = useNavigate()

    const [state, setState] = useState<CategoryState>({})

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        api.post("/api/v1/roles", state).then(res => {
            console.log(res)
            navigate("/dashboard/roles")
        })
    }

    useEffect(() => {
        if (updateSlug) {
            api.get(`/topics/one?slug=${updateSlug}`).then(res => {
                const data = res.data.data
                if (!data) return
                const updatedState: CategoryState = {} as CategoryState
                if (data.name) updatedState["name"] = data.name
                if (data.description) updatedState["description"] = data.description
                setState(prevState => ({...prevState, ...updatedState}))
            })
        }
    }, [updateSlug])
    
    return (
        <div className="max-w-3xl w-full mx-auto">
            <h1 className="text-4xl font-semibold">{updateSlug ? "Update " : "Create "} Role</h1>
            <h4 className="text-lg font-medium mt-2"> Add information about roles</h4>

            <form onSubmit={handleSave}>

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

export default CreateRole;