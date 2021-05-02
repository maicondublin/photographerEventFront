import request from '../request'

export default async (event) => {
    return await request.put('/events', event)
}