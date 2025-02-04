import axios from 'axios';
import { SearchResult } from '@/model/search_result';
import { Post } from '@/model/post';

const BASE_URL = 'http://127.0.0.1:8000/api';

export async function findMatchedFish(file: File): Promise<SearchResult> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${BASE_URL}/image/get_matched_fish/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data;
}

export async function getPosts(): Promise<Post[]> {
    const response = await axios.get(`${BASE_URL}/post/`,);

    return response.data;
}

export async function post(url: string): Promise<Post> {
    const formData = new FormData();
    formData.append('photo', url);

    const response = await axios.post(`${BASE_URL}/post/`, formData);

    return response.data;
}
