interface Note {
    id: number;
    userId: number;
    title: string;
    text: string;
    createdDate: string;
    updatedDate: string;
    tags: Tag[];
    isArchived: boolean;
}

