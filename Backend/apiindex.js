import express from 'express';
import session from 'express-session';
import { router } from './routes.js';

const app = express();

app.use(session({
    secret: 'your-secret', 
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
