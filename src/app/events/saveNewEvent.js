import request from '../request'

export default async (event) => {
    return await request.post('/events', event)
}