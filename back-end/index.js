const express = require('express');
const app = express();
const Log = require('./app/middleware/logger')
const uuid = require('uuid')
require('dotenv').config();

app.use((req, res, next) => { req.headers.idReq = uuid.v4(); next(); })
app.use(Log.request)
app.use(Log.response)

const originalSend = app.response.send;
app.response.send = function sendOverWrite(body) {
  originalSend.call(this, body);
  this.__custombody__ = body;
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    return res.status(200).json({message: "Connected Succesfully"});
});

var router = express.Router();
var auth = require('./app/controllers/Auth/routes');
var store = require('./app/controllers/Store/routes');

app.use('/api/v1', router);
router.use('/auth', auth);
router.use('/store', store);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});