import axios from 'axios';
import { BreedsListResponse, BreedImagesResponse } from '@/types';

export const apiClient = axios.create({
    baseURL: 'https://dog.ceo/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchBreeds = async (): Promise<BreedsListResponse> => {
    const response = await apiClient.get<BreedsListResponse>('/breeds/list/all');
    return response.data;
};

export const fetchBreedImages = async (breed: string): Promise<string[]> => {
    const response = await apiClient.get<BreedImagesResponse>(`/breed/${breed}/images`);
    return response.data.message;
};