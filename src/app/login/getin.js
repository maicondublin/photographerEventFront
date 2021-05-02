import request from '../request'

export default async ( name, password ) => {
    return await request.put('/login', {name, password})
}