
export interface BreedsListResponse {
    message: {
        [breed: string]: string[]; // breed: [subbreed1, subbreed2]
    };
    status: string;
}

export interface BreedImagesResponse {
    message: string[]; // array of image urls
    status: string;
}

export interface Breed {
    name: string;
    images?: string[];
    subBreeds?: Breed[];
}

export interface BreedsState {
    breeds: Breed[];
    selectedBreed: Breed | undefined;
    breedsLoaded: boolean;
}

export interface AppState {
    title: string;
    error: string | null;
}