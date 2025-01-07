
export interface Pagination {
    current: number,
    pageSize: number,
}

export interface ApiResponse<T> {
    data: T;
    status: string;
    msg: string;
    code: number;
}