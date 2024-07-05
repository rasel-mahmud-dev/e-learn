import {create} from 'zustand'

type CategoryType = {
    slug: string,
    title: string
    id: string
}


interface CategoryStateType {
    categories: CategoryType[],
    setCategory: (cat: CategoryType[]) => void,

}

export const useCategoryState = create<CategoryStateType>((set) => ({
    categories: [],
    setCategory: (cat) => set((state) => ({
        ...state,
        categories: cat,
    }))

}))
