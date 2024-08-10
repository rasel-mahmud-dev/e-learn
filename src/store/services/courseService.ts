import {api} from "../../apis";

class CourseService {
    async fetchTopCourses(args: { topics?: string[] }) {
        try {
            let query = ``
            if (args.topics) {
                for (const topic of args.topics) {
                    query += `topic=${encodeURIComponent(topic)}&`
                }
            }
            const res = await api.get(`/api/v1/courses2?${query}`);
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

}


const courseService = new CourseService();
export default courseService