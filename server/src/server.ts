
// init project
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

// utils
import { sendMessagesToSanta } from './controllers/messages.js';
import { refreshUserData } from './mockData.js';

// routes
// these should not have @ts-ignore, spent hours moving express to ESM and wanted to just continue with the actual assignment
// @ts-ignore
import messagesRouter from './routes/messagesRoutes.js';
// @ts-ignore
import usersRouter from './routes/usersRoutes.js';
// @ts-ignore
import authRouter from './routes/authRoutes.js';


const app = express();
app.use(bodyParser());
app.use(morgan('tiny'));

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.static('public'));
const listener = app.listen(process.env.PORT || 5000, () => {
  console.log('Your app is listening on port 5000');
});

// get user & user profile data, could be moved to some init function
await refreshUserData();

app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// sends emails every 15 seconds
sendMessagesToSanta();
