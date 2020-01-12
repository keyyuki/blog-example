import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
//import * as createError from 'http-errors';
//import jwtAuth from './middleware/jwt-auth';
//import authGuard from './middleware/auth-guard';

import routes from './routes';

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'twig');
app.use(
  cors({
    origin(origin, cb) {
      const whitelist = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : [];
      cb(null, whitelist.includes(origin || ''));
    },
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));
//app.use(jwtAuth);
//app.use(authGuard);

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('404page');
});

// error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
  ) => {
    // log error
    //process.stderr.write(err.message);
    console.log(err);
    res.status(500).json({ code: 0, messages: ['internal server error!'] });
    return false;
  },
);
export default app;
