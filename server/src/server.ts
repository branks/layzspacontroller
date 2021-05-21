import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import cron from 'node-cron';
import { getInfo, getOnlineStatus, getStatus, setTemp } from './routes/apiRoutes';
import { checkTimers, getTimers, updateTimer, getTimer, createTimer, deleteTimer } from './routes/timerRoutes';

const app = express();
app.use(cors());
const port = 3000;

app.get('/api/info', getInfo);
app.get('/api/device/:did/status', getStatus);
app.get('/api/device/:did/online', getOnlineStatus);
app.post('/api/device/:did/setTemp', express.json(), setTemp);

app.get('api/device/:did/timer', getTimers);
app.post('api/device/:did/timer', createTimer);
app.get('api/device/:did/timer/:timerId', getTimer);
app.post('api/device/:did/timer/:timerId', updateTimer);
app.delete('api/device/:did/timer/:timerId', deleteTimer);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

cron.schedule('* * * * *', checkTimers);
