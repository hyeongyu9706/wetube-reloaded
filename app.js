import express from 'express';
import morgan from 'morgan';
import globalRouter from './src/routers/rootRouter';
import userRouter from './src/routers/userRouter';
import videoRouter from './src/routers/videoRouter';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

//app.get("/login",handleLogin);

//app.get("/",handleHome)

export default app;
