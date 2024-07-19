import {create} from 'zustand'
import adminDashboardService from "./services/adminDashboardService.ts";

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
    })),
    setTopics: (cat) => set((state) => ({
        ...state,
        topics: cat,
    }))

}))


interface AdminDashboardCategoryStateType {
    categories: CategoryType[],
    topics: any,
    fetchCategories: () => void,
    removeCategory: (id: string) => void,
    setTopics: (cat: any) => void,

}

export const useAdminDashboardState = create<AdminDashboardCategoryStateType>((set) => ({
    categories: [],
    isFetchingCategories: false,
    errorCategories: "",
    topics: [],
    fetchCategories: async function () {
        const categories = await adminDashboardService.fetchCategories()
        return set(state => {
            return {...state, categories}
        })
    },
    removeCategory: async function (id: string) {
        await adminDashboardService.removeCategory(id)
        return set(state => {
            return {...state, categories: state.categories.filter(category => category.id !== id)}
        })
    },
    setTopics: (cat) => set((state) => ({
        ...state,
        topics: cat,
    }))

}))
