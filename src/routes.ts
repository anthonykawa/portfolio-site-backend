import passport from 'passport';
import passportLocal from 'passport-local';
import express, { Request, Response } from 'express';

const router = express.Router();
const LocalStrategy = passportLocal.Strategy;
interface User {
  id?: number,
  username: string,
  password: string,
}

const adminUser: User = {
  username: 'admin',
  password: 'password'
}

passport.serializeUser((user: User, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  return done(null, { id, ...adminUser })
});

passport.use(new LocalStrategy({
  session: true,
}, (username: string, password: string, done: (err: Error, user?: User | boolean, message?: any) => any) => {
  console.log(username, password);
  if (adminUser.username !== 'admin' || adminUser.password !== 'password') return done(null, false, { message: 'Username or password is wrong.' });
  done(null, { id: 1, username, password });
}));

router.post('/login',
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  passport.authenticate('local', { failureRedirect: 'http://localhost:3002' }),
  (req: Request, res: Response) => {
    res.send('Successfully logged in');
  }
);

export default router;