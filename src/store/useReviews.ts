import {create} from 'zustand'
import {api} from "../apis";


interface CategoryStateType {
    reviewsCache: any,
    total: number,
    avgRating: number,
    rateStats: object,
    fetchReviews: (args: { courseId: string, pageNumber: number, orderBy: string, order: 1 }) => void,
    getPaginatedItems: (pageNumber: number) => any[]
}

export const useReviews = create<CategoryStateType>((set, getState) => ({
    reviewsCache: {},
    total: 0,
    avgRating: 0,
    rateStats: {},

    fetchReviews: async function ({courseId, order, orderBy, pageNumber}) {
        const {data} = await api.get(`/api/v1/courses/reviews/${courseId}?pageNumber=${pageNumber}&orderBy=${orderBy}&order=${order}`)
        if (data?.data) {
            const avgRating = data?.data?.avgRating
            const total = data?.data?.total
            const reviews = data?.data?.reviews

            const rateStats = {
                "1": data?.data?.["1"] || 0,
                "2": data?.data?.["2"] || 0,
                "3": data?.data?.["3"] || 0,
                "4": data?.data?.["4"] || 0,
                "5": data?.data?.["5"] || 0,
            }

            return set(state => {
                const updatedState = {...state}
                // const key = `${order}-${orderBy}-${pageNumber}`
                updatedState.reviewsCache[pageNumber] = reviews
                if (pageNumber === 1) {
                    updatedState.total = total
                    updatedState.avgRating = avgRating
                    updatedState.rateStats = rateStats
                }
                return updatedState

            })
        }

    },

    getPaginatedItems: function (pageNumber: number) {
        const reviewsCache = getState().reviewsCache
        return reviewsCache?.[pageNumber] || []
    }

}))
