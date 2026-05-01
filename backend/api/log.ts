import express from 'express';
import type { EventBlock } from '../common/types.js';
import { getDailyLog, setDailyLog } from '../implementation/dailyLog.js';
const router = express.Router();
export const logRoutes = router;

router.get('/modules/:userId', async (req, res) => {
    const params = req.params;
    const dateKey = req.body.dateKey;
    const userId = params.userId;
    res.status(201);
    res.send(getDailyLog(userId, dateKey));
});

router.post('/modules/:userId', async (req, res) => {
    const params = req.params;
    const dateKey = req.body.dateKey;
    const userId = params.userId;
    const data: EventBlock[] = req.body.data as unknown as EventBlock[];
    res.status(201);
    res.send(setDailyLog(userId, dateKey, data));
});
