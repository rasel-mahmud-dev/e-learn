
import {create} from 'zustand'
import adminDashboardService from "./services/adminDashboardService.ts";
import courseService from "./services/courseService.ts";


interface CategoryStateType {
    courses:  any[],
    fetchTopCourses: (args: {topics?: string[]}) => void,

}

export const useTopCourses = create<CategoryStateType>((set) => ({
    courses: [],
    fetchTopCourses: async function (args) {
        const courses = await courseService.fetchTopCourses(args)
        return set(state => {
            return {...state, courses}
        })
    },



}))
