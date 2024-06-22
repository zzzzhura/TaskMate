export interface CreateNoteRequest {
    title: string;
}

export interface WriteNoteRequest {
    noteId: number;
    text: string;
}

export interface AddTagRequest {
    noteId: number;
    tagId: number;
}

export interface LoadCoverRequest {
    noteId: number;
    formData: FormData;
}