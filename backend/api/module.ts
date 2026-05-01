import express from 'express';
import { PrismaClient } from '@prisma/client'
import { generateUser } from '../implementation/user.js'
import { enableModule, getModules } from '../implementation/module.js';
// setup constants to be used by all routes.
const router = express.Router();


// enables a module for a user 
router.post('/modules/add', async (req, res) => {
    const userId = req.body.userId;
    const moduleId = req.body.moduleId;
    console.log(userId, moduleId);
    const enabled_modules = await enableModule(userId, moduleId)
    res.status(201);
    res.send(enabled_modules);
});

// gets user Modules
router.get('/modules/:userId', async (req, res) => {
    const params = req.params;
    const userId = params.userId;
    res.status(201);
    res.send(getModules(userId));
});



export const moduleRoutes = router;



