import './App.css'
import React, {useEffect} from "react";
import {useAuthState} from "./store/authState.ts";
import {api} from "./apis";
import {useCategoryState} from "./store/categoriesState.ts";
import {RouterProvider} from "react-router-dom";
import router from "./routes";


function App() {
    const {auth, setAuth} = useAuthState()
    const {categories, setCategory} = useCategoryState()

    useEffect(() => {

        api.get("/categories").then(res => {
            setCategory(res.data)
        })

        setAuth(undefined)

    }, [])


    return (
        <>


            <RouterProvider router={router}/>


        </>
    )
}

export default App
