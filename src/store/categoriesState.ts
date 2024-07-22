import {create} from 'zustand'
import adminDashboardService from "./services/adminDashboardService.ts";
import instructorZoneService from "./services/instructorZoneService.ts";
import {a} from "vite/dist/node/types.d-aGj9QkWt";
import subCategories from "../screens/AdminDashboard/SubCategories.tsx";

type CategoryType = {
    slug: string,
    title: string
    id: string
}


interface CategoryStateType {
    categories: CategoryType[],
    subCategories: CategoryType[],
    topics: any,
    fetchCategories: () => void,
    fetchTopics: () => void,
    fetchSubCategories: () => void,

}

export const useCategoryState = create<CategoryStateType>((set) => ({
    categories: [],
    subCategories: [],
    topics: [],

    fetchTopics: async function () {
        const topics = await adminDashboardService.fetchTopics()
        return set(state => {
            return {...state, topics}
        })
    },
    fetchCategories: async function () {
        const categories = await adminDashboardService.fetchCategories()
        return set(state => {
            return {...state, categories}
        })
    },
    fetchSubCategories: async function () {
        const subCategories = await adminDashboardService.fetchSubCategories()
        return set(state => {
            return {...state, subCategories}
        })
    },

}))


interface AdminDashboardCategoryStateType {
    categories: CategoryType[],
    subCategories: CategoryType[],
    instructors: any
    roles: any,
    topics: any,
    usersRoles: any,
    fetchRoles: () => void,
    fetchCategories: () => void,
    fetchUsersRoles: () => void,
    fetchTopics: () => void,
    fetchInstructors: () => void,
    fetchSubCategories: () => void,
    removeCategory: (id: string) => void,
    removeRole: (id: string) => void,
    removeSubCategory: (id: string) => void,
    removeTopic: (id: string) => void,
    setTopics: (cat: any) => void,

}


export const useAdminDashboardState = create<AdminDashboardCategoryStateType>((set) => ({
    categories: [],
    instructors: [],
    usersRoles: [],
    roles: [],
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

    fetchInstructors: async function () {
        const instructors = await adminDashboardService.fetchInstructors()
        return set(state => {
            return {...state, instructors}
        })
    },


    fetchUsersRoles: async function () {
        const usersRoles = await adminDashboardService.fetchUsersRoles()
        return set(state => {
            return {...state, usersRoles}
        })
    },


    fetchRoles: async function () {
        const roles = await adminDashboardService.fetchRoles()
        return set(state => {
            return {...state, roles}
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
    removeRole: async function (id: string) {
        await adminDashboardService.removeRole(id)
        return set(state => {
            return {...state, roles: state.roles.filter(role => role.id !== id)}
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
