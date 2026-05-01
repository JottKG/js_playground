import express from 'express';
import { userRoutes } from './api/user.js';
import { moduleRoutes } from './api/module.js';
import { logRoutes } from './api/log.js';
import { eventRoutes } from './api/event.js';

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", moduleRoutes);
app.use("/api", logRoutes);
app.use("/api", eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});