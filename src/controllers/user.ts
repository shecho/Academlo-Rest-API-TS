import {Request, Response} from 'express';
import User from '../models/user';

const getUsers = async(req :Request, res :Response) => {
    
     let  results = User.find()
     res.json(results);
}

export default {
    getUsers
}