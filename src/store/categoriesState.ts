import {create} from 'zustand'

type CategoryType = {
    slug: string,
    title: string
    id: string
}


interface CategoryStateType {
    categories: CategoryType[],
    topics: any,
    setCategory: (cat: CategoryType[]) => void,
    setTopics: (cat: any) => void,

}

export const useCategoryState = create<CategoryStateType>((set) => ({
    categories: [],
    topics: [],
    setCategory: (cat) => set((state) => ({
        ...state,
        categories: cat,
    }))  ,
    setTopics: (cat) => set((state) => ({
        ...state,
        topics: cat,
    }))

}))
