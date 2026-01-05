import { Types } from 'mongoose';
export interface jwtUserPayload{
    sub:Types.ObjectId,
    username:string

}