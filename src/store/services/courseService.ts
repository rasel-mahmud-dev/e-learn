import {api} from "../../apis";

class CourseService {
    async fetchTopCourses() {
        try {
            const res = await api.get("/api/v1/instructor/courses");
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

}


const courseService = new CourseService();
export default courseService