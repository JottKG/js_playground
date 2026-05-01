import express from 'express';
import { addEvent, getUserEvents, deleteEvent } from '../implementation/event.js';

const router = express.Router();

// api endpoint for event/


// creates a new event and returns the id
router.post('/event/add', (req, res) => {
    const userId = req.body.creatorId;
    const name = req.body.name;
    const color = req.body.color;
    const notes = req.body.notes ?? "";
    const totalEvents = addEvent(userId, name, color, notes);
    res.send(totalEvents);
});

// delete some event using the id
router.post('/event/delete/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.body.userId;
    res.send(deleteEvent(eventId, userId));
});

// get all events of a user by userid
router.get('/event/:userid', (req, res) => {
    const params = req.params;
    const userId = params.userid;
    res.send(getUserEvents(userId));
});


export const eventRoutes = router;


