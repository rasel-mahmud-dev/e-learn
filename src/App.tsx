import './App.scss'
import React, {useEffect} from "react";
import {useAuthState} from "./store/authState.ts";
import {api} from "./apis";
import {useCategoryState} from "./store/categoriesState.ts";
import {RouterProvider} from "react-router-dom";
import router from "./routes";


function App() {
    const { setAuth} = useAuthState()
    const { setCategory, setTopics} = useCategoryState()

    useEffect(() => {

        api.get("/categories").then(res => {
            setCategory(res?.data?.data || [])
        })

        api.get("/api/v1/auth/verify").then(res => {
            setAuth(res?.data?.auth)
        })

        api.get("/topics").then(res => {
            setTopics(res.data)
        })



    }, [])


    return (
        <>


            <RouterProvider router={router}/>


        </>
    )
}

export default App
