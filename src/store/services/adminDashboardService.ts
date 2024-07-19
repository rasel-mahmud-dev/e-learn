import {api} from "../../apis";

class AdminDashboardService {
    async fetchCategories() {
        try {
            const res = await api.get("/categories")
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

    async fetchSubCategories() {
        try {
            const res = await api.get("/sub-categories")
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

    async fetchTopics() {
        try {
            const res = await api.get("/topics")
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

    async removeSubCategory(id: string) {
        try {
            const {status} = await api.delete(`/sub-categories/${id}`)
            return status === 200
        } catch (ex) {
            return ex
        }
    }

    async removeCategory(id: string) {
        try {
            const {status} = await api.delete(`/categories/${id}`)
            return status === 200
        } catch (ex) {
            return ex
        }
    }
    async removeTopic(id: string) {
        try {
            const {status} = await api.delete(`/topics/${id}`)
            return status === 200
        } catch (ex) {
            return ex
        }
    }
}

const adminDashboardService = new AdminDashboardService();
export default adminDashboardService