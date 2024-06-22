interface Note {
    id: number;
    userId: number;
    title: string;
    text: string;
    image: ArrayBuffer;
    createdDate: string;
    updatedDate: string;
    tags: Tag[];
    isArchived: boolean;
}

