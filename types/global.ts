

export interface ApiResponse<T> {
    data: T;
    status: string;
    msg: string;
    code: number;
}