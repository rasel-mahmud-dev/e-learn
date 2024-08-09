import {api} from "../../apis";

class TopicService {
    async storeTopicPref(topicSlug: string) {
        try {
            const res = await api.get(`/topics/pref/${topicSlug}`);
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

  async getPopularTopics() {
        try {
            const res = await api.get(`/topics/popular`);
            return res?.data?.data || []
        } catch (ex) {
            return []
        }
    }

}


const topicService = new TopicService();
export default topicService