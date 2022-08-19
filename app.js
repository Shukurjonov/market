const path = require('path');

const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const moment = require('moment');
const { replaceAll, saveLog } = require('./utils/functions');

const { errorMessageHandler } = require('./utils/helper');

const app = express();

const authMiddleware = require('./middlewares/auth');

const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const consultationsRouter = require('./routes/consultations');
const ordersRouter = require('./routes/orders');
const siteRouter = require('./routes/site');

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

app.use('/auth', authRouter);
app.use('/api/home', homeRouter);
app.use('/api/product', authMiddleware, productsRouter);
app.use('/api/category', authMiddleware, categoriesRouter);
app.use('/api/consultation', authMiddleware, consultationsRouter);
app.use('/api/order', authMiddleware, ordersRouter);
app.use('/api/site', authMiddleware, siteRouter);

app.use(express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  saveLog(path.join(process.cwd(), 'logs', `${replaceAll(req._parsedUrl.pathname, '/', '_')}.txt`), `
    \n\n || ============================================================= ||
    Log Time: ${moment().format('DD.MM.YYYY hh:mm:ss')}
    || ===>   Req query: ${JSON.stringify(req.query)} 
    || ===>   Req params: ${JSON.stringify(req.params)} 
    || ===>   Req body: ${JSON.stringify(req.body)} 
    || ===>   Req method: ${req.method} 
    || ===>   Endpoint: ${req.originalUrl}
    || ===>   Error message: ${err.message}
  `)
  const error = errorMessageHandler(err.status, err.message);
  res.status(err.status || 500).send(error);
});

module.exports = {
  app
}