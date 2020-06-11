import {Request, Response} from 'express';
import User from '../models/user';

const getUsers = (req, res) => {
    User.find().then( results => {
        res.json(results);
    });
}

export default {
    getUsers
}