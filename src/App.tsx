import './App.scss'
import React, {useEffect} from "react";
import {useCategoryState} from "./store/categoriesState.ts";
import {RouterProvider} from "react-router-dom";
import router from "./routes";


function App() {
    const {fetchCategories, fetchTopics, fetchSubCategories} = useCategoryState()

    useEffect(() => {
        fetchSubCategories()
        fetchTopics()
        fetchCategories()
    }, [])


    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
