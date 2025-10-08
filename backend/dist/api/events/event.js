import express from 'express';
const router = express.Router();
// api endpoint for event/
// creates a new event and returns the id
router.post('/event', (req, res) => {
    res.send('You are in Route 1');
});
// updates some event using the id
router.put('/event/:eventid', (req, res) => {
    res.send(`You are in Route 2 ${req.params.eventid}`);
});
// get all events of a user by userid
router.get('/event/:userid', (req, res) => {
    res.send(`You are in Route 1 ${req.params.userid}`);
});
export const eventRoutes = router;
//# sourceMappingURL=event.js.map