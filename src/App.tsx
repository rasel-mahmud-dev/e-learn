import './App.css'
import Header from "./components/Header/Header.tsx";
import Hero from "./components/Hero/Hero.tsx";
import {useEffect} from "react";
import {useAuthState} from "./store/authState.ts";
import {api} from "./apis";
import {useCategoryState} from "./store/categoriesState.ts";
import TopCategories from "./components/TopCategories.tsx";

function App() {
        const {auth, setAuth} = useAuthState()
        const {categories, setCategory} = useCategoryState()

    useEffect(()=>{

        api.get("/categories").then(res=>{
            setCategory(res.data)
        })

        setAuth(undefined)

    }, [])


    console.log(auth)

  return (
      <>
          <Header />
          <Hero />
          <TopCategories />


      </>
  )
}

export default App
