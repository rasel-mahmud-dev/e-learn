
import {create} from 'zustand'
import adminDashboardService from "./services/adminDashboardService.ts";
import courseService from "./services/courseService.ts";


interface CategoryStateType {
    courses:  any[],
    fetchTopCourses: () => void,

}

export const useTopCourses = create<CategoryStateType>((set) => ({
    courses: [],
    fetchTopCourses: async function () {
        const courses = await courseService.fetchTopCourses()
        return set(state => {
            return {...state, courses}
        })
    },



}))
