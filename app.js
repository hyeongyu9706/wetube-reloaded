import express from 'express';
import morgan from 'morgan';
import globalRouter from './src/routers/rootRouter';
import userRouter from './src/routers/userRouter';
import videoRouter from './src/routers/videoRouter';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { localsMiddleware } from './src/middleware';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 20000,
        },
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

app.use((req, res, next) => {
    req.sessionStore.all((error, session) => {
        next();
    });
});

app.use(localsMiddleware);
app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

//app.get("/login",handleLogin);

//app.get("/",handleHome)

export default app;
