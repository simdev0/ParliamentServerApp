// @ts-check
var util = require('./util');
const express = require('express');
const http = require('http');
const url = require('url'); 
var cookieParser = require('cookie-parser');
const request = require('request');
const cors = require('cors');
const db = require('./queries');



async function main() {
  // Azure App Service will set process.env.port for you, but we use 3000 in development.
  const PORT = process.env.PORT || 3000;
  // Create the express routes
  let app = express();

  var corsOptions = {
    origin: 'http://se4a.azurewebsites.net',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))


  app.use(express.static('public'));
  app.use(cookieParser());

  app.get('/', async (req, res) => {
    if(req.query && req.query.loginsession)
    {
    res.cookie('loginsession',req.query.loginsession, { maxAge: 3600000, httpOnly: true, })
    res.redirect(url.parse(req.url).pathname);
    }
    else
    {
    let indexContent = await util.loadEnvironmentVariables({host: process.env['HTTP_HOST']});
    res.end(indexContent);
    }
  });

  app.get('/api/metadata', async (req, res) => {
    if (req.cookies.loginsession) {
      let tryappserviceendpoint= (process.env['APPSETTING_TRYAPPSERVICE_URL'] || 'https://tryappservice.azure.com') + '/api/vscoderesource';
      const options = {
        url: tryappserviceendpoint,
        headers:{
            cookie: 'loginsession='+req.cookies.loginsession
        }
      };
      
  const x =request(options);
  x.pipe(res);
}
else{
  res.end(404);
}
});



app.get('/api/check/:email/:password', db.checkLoginDetails);
app.get('/api/committees', db.getCommittees)
app.get('/api/committee/:committee_id', db.getCommittee)
app.get('/api/committee/address/:address_id', db.getCommitteeAddress)
app.get('/api/committee/members/:committee_id', db.getCommitteeMembers)
app.get('/api/committee/documents/:committee_id', db.getCommitteeDocuments)

// Create the HTTP server.
  let server = http.createServer(app);
  server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
}

main();
