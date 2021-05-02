import request from '../request'

export default async () => {
    return await request.get('/events')
}