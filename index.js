import express, { urlencoded } from "express";
import hbs from "hbs";
import fileUpload from "express-fileupload";
import homeRouter from "./src/routes/home.js";
import techStackRouter from './src/routes/admin/tech_stack.js';
import workExperienceRouter from './src/routes/admin/work_experience.js';

const app = express();  
const port = 3000;

hbs.registerPartials('src/views/partials');

app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.set('views', 'src/views');
app.use(express.static('src/public'))
app.use(fileUpload());
app.use(urlencoded());

app.use(homeRouter);
app.use('/admin/tech-stack', techStackRouter);
app.use('/admin/work-experience', workExperienceRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})