const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,dbObj) => {
    if(err) {
      return console.log("Unable to connect to mongoDB server "+ err);
    }

    console.log('Connected to mongoDB')
    //
    // dbObj.collection('Todos').insertOne({
    //     text : 'some todo test',
    //     completed : false
    // },(err,res)=>{
    //   if(err) {
    //     return console.log("Unable to store the data into the collection "+ err);
    //   }
    //
    //   console.log(JSON.stringify(res.ops,undefined,2));
    // })


    dbObj.collection('Todos').find().toArray().then((docs) => {
      console.log(docs);
      console.log(JSON.stringify(docs),undefined,2)
    }).catch(err => {

    })

    // dbObj.close();
})
