import routes from './routes/index.js'
import app from './app/app.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser';


const port = process.env.PORT || 3001;
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes)
app.listen(port);
console.log(`-----------Port Ready: ${port}`);
