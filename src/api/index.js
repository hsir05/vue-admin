import request from '@/utils/request'

export function acqData (url, data) {
    return request({
        url: url,
        method: 'post',
        data: data
    })
}
export function delData (url, data) {
    return request({
        url: url,
        method: 'post',
        params: data
    })
}

export function getData (url, params) {
    return request({
        url: url,
        method: 'get',
        params: params
    })
}

