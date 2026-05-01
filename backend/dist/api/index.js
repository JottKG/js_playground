import express from 'express';
import { eventRoutes } from './events/event.js';
// import logRoutes from './logging/log';
import { userRoutes } from './users/user.js';
const router = express.Router();
// group under /api
router.use('/event', eventRoutes);
// router.use('/log', logRoutes);
router.use('/user', userRoutes);
export const indexRoutes = router;
//# sourceMappingURL=index.js.map