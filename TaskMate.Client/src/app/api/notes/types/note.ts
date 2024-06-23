interface Note {
    id: number;
    userId: number;
    title: string;
    text: string;
    image: ArrayBuffer | string;
    createdDate: string;
    updatedDate: string;
    tags: Tag[];
    isArchived: boolean;
}

