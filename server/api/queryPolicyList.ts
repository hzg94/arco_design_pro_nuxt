import type {ApiResponse} from "~/types/global";
import Mock from 'mockjs'

const { Random } = Mock;

const data = Mock.mock({
    'list|55': [
        {
            'id|8': /[A-Z][a-z][-][0-9]/,
            'number|2-3': /[0-9]/,
            'name|4-8': /[A-Z]/,
            'contentType|1': ['img', 'horizontalVideo', 'verticalVideo'],
            'count|2-3': /[0-9]/,
            'status|1': ['online', 'offline'],
            'filterType|1': ['artificial', 'rules'],
            'createdTime': Random.datetime(),
        },
    ],
});

export interface PolicyRecord {
    id: string;
    number: number;
    name: string;
    contentType: 'img' | 'horizontalVideo' | 'verticalVideo';
    filterType: 'artificial' | 'rules';
    count: number;
    status: 'online' | 'offline';
    createdTime: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
    current: number;
    pageSize: number;
}

export interface PolicyListRes {
    list: PolicyRecord[];
    total: number;
}

export default defineEventHandler((event):ApiResponse<PolicyListRes> => {
    const {current = 1, pageSize = 10 } = getQuery(event)
    const p = current as number;
    const ps = pageSize as number;
    return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
    });
})