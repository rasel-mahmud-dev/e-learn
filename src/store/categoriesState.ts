import {create} from 'zustand'
import adminDashboardService from "./services/adminDashboardService.ts";
import instructorZoneService from "./services/instructorZoneService.ts";

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
    subCategories: CategoryType[],
    topics: any,
    fetchCategories: () => void,
    fetchTopics: () => void,
    fetchSubCategories: () => void,
    removeCategory: (id: string) => void,
    removeSubCategory: (id: string) => void,
    removeTopic: (id: string) => void,
    setTopics: (cat: any) => void,

}


export const useAdminDashboardState = create<AdminDashboardCategoryStateType>((set) => ({
    categories: [],
    subCategories: [],
    isFetchingCategories: false,
    errorCategories: "",
    topics: [],

    fetchCategories: async function () {
        const categories = await adminDashboardService.fetchCategories()
        return set(state => {
            return {...state, categories}
        })
    },


    fetchTopics: async function () {
        const topics = await adminDashboardService.fetchTopics()
        return set(state => {
            return {...state, topics}
        })
    },

    removeTopic: async function (id: string) {
        await adminDashboardService.removeCategory(id)
        return set(state => {
            return {...state, topics: state.topics.filter(top => top.id !== id)}
        })
    },

    fetchSubCategories: async function () {
        const subCategories = await adminDashboardService.fetchSubCategories()
        return set(state => {
            return {...state, subCategories}
        })
    },
    removeCategory: async function (id: string) {
        await adminDashboardService.removeCategory(id)
        return set(state => {
            return {...state, categories: state.categories.filter(category => category.id !== id)}
        })
    },
    removeSubCategory: async function (id: string) {
        await adminDashboardService.removeSubCategory(id)
        return set(state => {
            return {...state, subCategories: state.subCategories.filter(category => category.id !== id)}
        })
    },
    setTopics: (cat) => set((state) => ({
        ...state,
        topics: cat,
    }))

}))


interface InstructorZoneStateType {
    courses: any[],

    fetchCourses: () => void,


}

export const useInstructorZoneState = create<InstructorZoneStateType>((set) => ({
    courses: [],

    fetchCourses: async function () {
        const courses = await instructorZoneService.fetchCourses()
        return set(state => {
            return {...state, courses}
        })
    },


}))
