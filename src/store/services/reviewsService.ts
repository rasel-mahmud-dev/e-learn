import {api} from "../../apis";

class ReviewService {
    async fetchReviews() {
        try {
            const res = await api.get("/api/v1/instructor/courses");
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

}


const reviewsService = new ReviewService();
export default reviewsService