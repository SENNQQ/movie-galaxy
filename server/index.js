import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express()
const port = 3100

import routes from './routes/routes.js';

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors())
// app.use(express.json())
app.use('/api', routes)

const start = () => {
    try {
        app.listen(port, () => console.log(`App running on port ${port}.`))
    } catch (e) {
        console.error('Error', e.message);
        process.exit(1);
    }
};

start();