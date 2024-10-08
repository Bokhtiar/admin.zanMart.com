import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async (page, perPage) => {
    return await privateRequest.get(`/admin/banner?page=${page}&page_size=${perPage}`);
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/banner/', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/banner/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    console.log(data.get("name"),id,"<--------------------------->");
    return await privateRequest.post(`/admin/banner/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/banner/${id}`)
}

/** banner list */
export const bannerList = async () => {
    return await privateRequest.get(`/admin/banner/`);
};
