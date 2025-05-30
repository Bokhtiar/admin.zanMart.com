import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page, perPage) => {
    return await privateRequest.get(`/admin/productvariant?page=${page}&page_size=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/productvariant', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/productvariant/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
     
    return await privateRequest.put(`/admin/productvariant/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/productvariant/${id}`)
}

/** productvariant list */
export const productvariantList = async () => {
    return await privateRequest.get(`/admin/productvariant/`);
};