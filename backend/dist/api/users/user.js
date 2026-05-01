import express from 'express';
import { PrismaClient } from '@prisma/client';
import { generateUser } from '../../implementation/database/create-user.js';
import { UserDTO } from '../../common/dtos/userDTO.js';
// setup constants to be used by all routes.
const router = express.Router();
// api endpoint for users/
// creates a new user, and returns their id 
router.post('/', async (req, res) => {
    const email = req.body.email;
    const generated_user = await generateUser(email);
    res.send(generated_user?.toString());
});
// enables a module for a user 
router.post('/modules/:moduleid', (req, res) => {
    res.send('You are in Route 1');
});
// updates some user information given a id and a body with information.
router.put('/:id', (req, res) => {
    res.send('You are in Route 1');
});
// get user information, this should do some auth to check if they can actually send this btw.
router.get('/:id', (req, res) => {
    res.send('You are in Route 1');
});
export const userRoutes = router;
//# sourceMappingURL=user.js.map