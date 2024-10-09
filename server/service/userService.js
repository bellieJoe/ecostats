import UserModel from "../model/User.js";

export default class UserService {
    static async test(){
        return await UserModel.find();
    }
}