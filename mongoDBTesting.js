const mongoose = require('mongoose');
const fs = require('fs');

// Testing MongoDB --------------------------
const dbURI = `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@citiesdb.cirlsui.mongodb.net/citiesDB?retryWrites=true&w=majority`;
// Schema:
// name : data(JSON)
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=> {
    
    console.log('connected to db');
  })
  .catch((error)=> {
    console.log(error);
  });



async function retrieveJSON(url){
  let response = fs.readFile(url, 'utf-8', async (err, data)=> {
    console.log(__dirname);
    if(err){
      console.log(err);
    }
    let json = await JSON.stringify(data);
    console.log(json);
  })
  // const response = await axios({
  //   method: 'get',
  //   url: url,
  //   responseType: 'json'
  // });
  // console.log(await response);
}
retrieveJSON('amsterdam.json');

// axios.get('/amsterdam.json').then((result)=> {
//   console.log(result);
// })


// let tempData = {};
// tempData.name = "Amsterdam";
// tempData.title = "Amsterdam, Netherlands, Europe";
// const data = database.find({
//     name: data.name
//   }, function (error, docs) {
//     if (error) {
//       response.end();
//       return;
//     } else if (docs.length == 0) {
//       response.json({
//         status: 'success',
//         action: 'Not in database',
//         name: data.name,
//       });
//     } else {
//       response.json({
//         status: 'success',
//         action: 'read from db',
//         name: data.name,
//         title: docs[0]["title"],
//         data: docs[0]["data"]
//       });
//     }
//   });

// Testing MongoDB --------------------------


