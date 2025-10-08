import express from 'express';
import { indexRoutes } from './api/index.js';


const app = express();
app.use(express.json());
app.use('/api', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});