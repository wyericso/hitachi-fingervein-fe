'use strict';

const express = require('express');
const app = express();
/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
*/

app.use(express.static('views'));

const listener = app.listen(80, function() {
    console.log('Listening on port ' + listener.address().port);
});
