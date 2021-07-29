const firebase = require("../config/database");

const Event = firebase.firestore().collection("event");

const Addevent = async (data, callback) => {
  let addevent = await (
    await Event.doc("FZ5VoNU0f3yGvyLvuxwL").get()
  ).data(); 
  if (addevent.event) {
    addevent.event.push(data.body);
  }else{
    addevent.event = [data.body]
  }
  Event.doc("FZ5VoNU0f3yGvyLvuxwL")
    .update(addevent)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const Allevent = async (data,callback) => {  

  await Event.doc("FZ5VoNU0f3yGvyLvuxwL").get().then((response)=>{
    callback(null,response.data().event)
      })
      .catch((error)=>{
    
    callback(error, null);
  })
};

const allevent = async (data,callback) => {  
  let response = [];  
  await Event.doc("FZ5VoNU0f3yGvyLvuxwL").get().then(function(querySnapshot){
        const docs = querySnapshot.data().event;
        const result = docs.filter((x) =>{ return x.areaname == data});
        console.log("popppop",result);
        callback(null,result);
    })
      .catch((error)=>{   
    callback(error, null);
  })
};

module.exports = {
  Addevent,
  Allevent,
  allevent
};

