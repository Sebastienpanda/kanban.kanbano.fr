export type Status = "todo" | "in_progress" | "done";

export type Tasks = {
    id: string;
    title: string;
    description: string;
    status: Status;
    columnId: string;
    order: number;
    createdAt: string;
    updatedAt?: string | null;
};
