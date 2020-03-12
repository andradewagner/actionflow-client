import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const insertTest = payload => api.post(`/test`, payload)
export const getAllTests = () => api.get(`/tests`)
export const updateTestById = (id, payload) => api.put(`/test/${id}`, payload)
export const deleteTestById = id => api.delete(`/test/${id}`)
export const getTestById = id => api.get(`/test/${id}`)

const apis = {
    insertTest,
    getAllTests,
    updateTestById,
    deleteTestById,
    getTestById,
}

export default apis