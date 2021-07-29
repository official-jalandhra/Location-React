const express = require("express");
const router = express.Router();

const addeventservice = require("../services/addeventservice");

router.post("/api/addevent",async(req,res)=>{
    const name = req.body.name;
    const areaname = req.body.areaname
    if(!name)
    {
        return res.send({
            status: 400,
            message: "name is required",
          });   
    }
    if(!areaname)
    {
        return res.send({
            status: 400,
            message: "areaname is required",
          });   
    }
    await addeventservice.Addevent(req, (err, response) => {
        res.send({
          status: 200,
          message: "event add successfuly",
        });
      });
})

router.get("/api/allevent", (req, res) => {
  // const areaname =req.params.areaname;
  addeventservice.Allevent(req, (err, response) => {
    res.send({
      status: 200,
      message: "Done",
      data: response
    })
  })
});

router.get("/api/allevent/:areaname", (req, res) => {
  const areaname =req.params.areaname;
  addeventservice.allevent(areaname, (err, response) => {
    res.send({
      status: 200,
      message: "Done",
      data: response
    })
  })
});

module.exports = router;    