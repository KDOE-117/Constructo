import express from 'express'
import morgan from 'morgan';
import routes from '../routes/index.js';

const app = express();

app.use(morgan("dev"));
/*MiddleWare*/
app.use("/api/v1", routes)

export default app;
