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

    async removeCategory(id: string) {
        try {
            const {status} = await api.delete(`/categories/${id}`)
            return status === 200
        } catch (ex) {
            return ex
        }
    }
}

const adminDashboardService = new AdminDashboardService();
export default adminDashboardService