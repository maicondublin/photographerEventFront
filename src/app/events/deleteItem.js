import request from '../request'

export default async (event) => {
    return await request.delete('/events/' + event._id)
}