
import express from 'express';
import { generateUser, getUserInfo } from '../implementation/user.js';
const router = express.Router();


// creates a new user, and returns their id 
// request body:
// {
//    "email": "test@gov.ca"
//}
//adds user
router.post('/user', async (req, res) => {
    const email = req.body.email;
    const generated_user = await generateUser(email);
    res.status(201);
    res.send({ id: generated_user.id });
});

// updates some user information given a id and a body with information.
router.put('/:id', (req, res) => {
    res.send('You are in Route 1');
});

// get user information, this should do some auth to check if they can actually send this btw.
router.get('/:id', (req, res) => {
    const params = req.params;
    const userId = params.id;
    res.send(getUserInfo(userId));
});


export const userRoutes = router;