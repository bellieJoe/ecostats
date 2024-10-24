import { User } from "./User"

export interface Program {
    _id : string
    name : string
    management : string
    programHead : User | string
}