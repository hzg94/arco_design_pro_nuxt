import type {ApiResponse} from "~/types/global";

export const successResponseWrap = <T>(data: T):ApiResponse<T> => {
    return {
        data,
        status: 'ok',
        msg: '请求成功',
        code: 20000,
    };
};

export const failResponseWrap = <T>(data: T, msg: string, code = 50000):ApiResponse<T> => {
    return {
        data,
        status: 'fail',
        msg,
        code,
    };
};
