import {create} from 'zustand'
import {api} from "../apis";


interface StateType {
    detail?: {
        id: number,
        title: string,
        slug: string,
        subCategories?: string[]
    },
    totalLearner: number
    fetchTopicDetail: (topicSlug: string) => void,
}

export const useTopicDetail = create<StateType>((set) => ({
    detail: undefined,
    totalLearner: 0,
    fetchTopicDetail: async function (topicSlug: string) {
        const res = await fetchTopicDetail(topicSlug)
        return set(state => {
            return {...state, detail: res?.data.detail, totalLearner: res?.data.enrollmentCount}
        })
    },


}))


async function fetchTopicDetail(topicSlug: string) {
    try {
        const {data} = await api.get<{
            "data": {
               detail: {
                   id: number,
                   title: string,
                   slug: string,
                   subCategories?: string[]
               }
                "enrollmentCount": number
            }
        }>("/topics/info/" + topicSlug)
        return data || {}
    } catch (ex) {

    }
}