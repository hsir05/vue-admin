import settings from '@/settings';
import request from '@/utils/request'


export function login (data) {
    return request({
        url: '/blade-auth/oauth/token',
        method: 'post',
        headers: {
            'Tenant-Id': settings.tenantId
        },
        params: {
            username: data.username,
            password: data.password,
            code: data.code,
            tenantId: settings.tenantId,
            grant_type: settings.grant_type,
            scope: settings.scope,
            type: settings.type
        }
    })
}

export const refreshToken = (refresh_token) => request({
    url: '/blade-auth/oauth/token',
    method: 'post',
    headers: {
        'Tenant-Id': settings.tenantId
    },
    params: {
        tenantId: settings.tenantId,
        refresh_token,
        grant_type: "refresh_token",
        scope: settings.scope,
    }
})

export function logout () {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}