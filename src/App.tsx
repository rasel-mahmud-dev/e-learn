import './App.scss'
import React, {useEffect} from "react";
import {useCategoryState} from "./store/categoriesState.ts";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import {api} from "./apis";
import {useAuthState} from "./store/authState.ts";


function App() {
    const {fetchCategories, fetchTopics, fetchSubCategories} = useCategoryState()
    const {setAuth} = useAuthState()

    useEffect(() => {
        fetchSubCategories()
        fetchTopics()
        fetchCategories()

        api.get("/api/v1/auth/verify").then(res => {
            setAuth(res?.data?.auth)
        })
    }, [])


    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
