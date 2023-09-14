export interface ICommentData {
    topicId: number;
    parentId?: number;
    authorId: number;
    text: string;
    createdAt?: string;
    updatedAt?: string;
}
