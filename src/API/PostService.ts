import axios from "axios"
import { IPost } from "../types/types"

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;
    }
}