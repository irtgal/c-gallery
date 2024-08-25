
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

export interface SubBreed extends Breed {
    parentBreed: string;
}

export interface BreedsState {
    breeds: Breed[];
    selectedBreed: Breed | null;
    selectedSubBreed: SubBreed | null;
    breedsLoaded: boolean;
}

export interface AppState {
    title: string;
    error: string | null;
    loading: boolean;
}