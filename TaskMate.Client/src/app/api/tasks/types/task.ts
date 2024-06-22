export interface Task {
    id: number;
    text: string;
    userId: number;
    isCompleted: boolean;
    createdDate: string;
    endedDate: string;
    status: Status;
}

export enum Status {
    Urgent = "Срочно",
    Middle =  "Умеренно", 
    NotUrgent = "Не срочно"
}