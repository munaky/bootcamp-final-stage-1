import express, { urlencoded } from "express";
import hbs from "hbs";
import fileUpload from "express-fileupload";
import session from "express-session";
import flash from 'express-flash';
import cookieParser from "cookie-parser";
import path from 'path';
import homeRouter from "./src/routes/home.js";
import authRouter from './src/routes/admin/auth.js';
import techStackRouter from './src/routes/admin/tech_stack.js';
import workExperienceRouter from './src/routes/admin/work_experience.js';
import dashboardRouter from './src/routes/admin/dashboard.js';
import projectRouter from './src/routes/admin/project.js';

const app = express();  
const port = 3000;
const upload_path = path.join(import.meta.dirname, 'src/public/images/uploads')

app.locals.upload_path = upload_path;

hbs.registerPartials('src/views/partials');
hbs.registerHelper('plusOne', val => val + 1);

app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.set('views', 'src/views');
app.use(express.static('src/public'))
app.use(fileUpload());
app.use(urlencoded());
app.use(session({
  secret: 'p3Rsona1$Web%👍',
  resave: false,
  saveUninitialized: true,
}))
app.use(cookieParser('p3Rsona1$Web%👍'))
app.use(flash())

app.use(homeRouter);
app.use('/auth', authRouter);
app.use('/admin', dashboardRouter);
app.use('/admin/tech-stack', techStackRouter);
app.use('/admin/work-experience', workExperienceRouter);
app.use('/admin/project', projectRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})