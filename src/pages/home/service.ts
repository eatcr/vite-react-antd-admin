import request from '@/utils/request';

// 获取列表
export async function getList() {
    return request('/category/list', {
        method: 'GET'
    });
}

// 新增项
export async function addItem(params: any) {
    return request('/category/add', {
        method: 'POST',
        data: params
    });
}

// 删除项
export async function deleteItem(params: any) {
    return request('/category/delete', {
        method: 'POST',
        data: params
    })
}

// 修改项
export async function editItem(params: any) {
    return request('/category/edit', {
        method: 'POST',
        data: params
    })
}