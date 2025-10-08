import express from 'express';


const router = express.Router();

// api endpoint for users/


// creates a new user, and returns their id 
router.post('/users', (req, res) => {
    res.send('You are in Route 1');
});

// enables a module for a user 
router.post('/users/modules/:moduleid', (req, res) => {
    res.send('You are in Route 1');
});


// updates some user information given a id and a body with information.
router.put('/users/:id', (req, res) => {
    res.send('You are in Route 1');
});

// get user information, this should do some auth to check if they can actually send this btw.
router.get('/users/:id', (req, res) => {
    res.send('You are in Route 1');
});

export const userRoutes = router;



