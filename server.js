if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const fs = require('fs');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const City = require('./models/cityModel');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');
// app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true
// });

const dbURI = `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@citiesdb.cirlsui.mongodb.net/citiesDB?retryWrites=true&w=majority`;
// Schema:
// name : data(JSON)
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=> {
    app.listen(process.env.PORT || 3000);
    console.log('connected to db');
  })
  .catch((error)=> {
    console.log(error);
  });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);

// app.get('/add-city', (req, res)=> {
//   const city = new City({
//     name: "Amsterdam",
//     info:
//   });
// });

// app.get('/', (req, res) => {
// })

// Ottenere tutte le città salvate
// app.get('/cities', (req, res) => {
//   City.find()
//     .then((result) => {
//     res.render('index', {title: 'All cities', cities: result})
//   }).catch((error) => {
//     console.log(error);
//   })
// })
// Ottenere tutte le città salvate
// Ottenere tutte le città salvate Mod async / await
app.get('/cities', async (req, res) => {
  try {
    let cities = await City.find().sort({createdAt: -1});
    // console.log(cities);
    let response = await res.render('index', {title: 'All my cities', cities: cities});
  } catch (error) {
    console.log(error);
  }
})
// Ottenere tutte le città salvate Mod async / await


// Ottenere una città salvata
app.get('/city/create', (req, res) => {
  City.findById('62cbeacdd62b2bc5e78aa23b')
  .then((result) => {
    res.send(result);
  }).catch((error) => {
    console.log(error);
  })
})
// Ottenere una città salvata






async function retrieveJSON(url){
  let response = fs.readFile(url, 'utf-8', async (err, data) => {
    // console.log(__dirname);
    if (err) {
      console.log(err);
    }
    // console.log(JSON.parse(data)["data"]["teleport_city_score"]);
    let titleString = JSON.stringify(JSON.parse(data)["title"])
    let dataString = JSON.stringify(JSON.parse(data)["data"]);

    // Per inserire dati nel db
    app.get('/add-city', (req, res) => {
      const city = new City({
        name: titleString,
        info: dataString
      });
      city.save().then((result) => {
        res.send(result)
      }).catch(error => {
        console.log(error);
      })
    });
    // Per inserire dati nel db

    // console.log(dataString);
    // let json = await JSON.stringify(data);
    // console.log(json);
    // return data["name"];
  });
  // const response = await axios({
  //   method: 'get',
  //   url: url,
  //   responseType: 'json'
  // });
  // console.log(await response);
}
// retrieveJSON('amsterdam.json');
retrieveJSON('paris.json');
