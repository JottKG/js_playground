import express from 'express';


const router = express.Router();

// api endpoint for event/


// creates a new event and returns the id
router.post('/', (req, res) => {
    res.send('You are in Route 1');
});

// updates some event using the id
router.put('/:eventid', (req, res) => {
    res.send(`You are in Route 2 ${req.params.eventid}`);
});

// get all events of a user by userid
router.get('/:userid', (req, res) => {
    res.send(`You are in Route 1 ${req.params.userid}`,);
});


export const eventRoutes = router;


