const express = require('express')
const bodyParser = require('body-parser')  // for uploads (POST)
const cors = require('cors')
const db = require('./queries')

const app = express()

var corsOptions = {
    origin: 'http://se4a.azurewebsites.net',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}


app.use(cors(corsOptions))



app.get('/api/check/:email/:password', db.checkLoginDetails);
app.get('/api/committees', db.getCommittees)
app.get('/api/committee/:committee_id', db.getCommittee)
app.get('/api/committee/address/:address_id', db.getCommitteeAddress)
app.get('/api/committee/members/:committee_id', db.getCommitteeMembers)
app.get('/api/committee/documents/:committee_id', db.getCommitteeDocuments)

var http = require('http');
var port = process.env.port || 1337;
// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type':'text/plain'});
//     // res.end('Hello World\n');
// }).listen(port);
app.listen(port);