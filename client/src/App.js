import React, { useState, useEffect } from "react";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Allevent,Areauser
 } from "./store/action/event";

const App = (props) => {
  const [pincode, setpincode] = useState("");
  const [city, setcity] = useState("");
  const [areaname, setareaname] = useState("");

  useEffect(() => {
    props.Allevent();
  }, []);

  console.log("datadtadatdtadttad", props.eventList.data);

  const getCoordintes = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getCity(coordinates);
      return;
    };

    const error = (err) => {
         console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  const getCity = (coordinates) => {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
    xhr.open("GET","https://us1.locationiq.com/v1/reverse.php?key=pk.4266f81b62de076a67f4cffde9806438&lat=" + lat +"&lon=" + lng + "&format=json",true);
    xhr.send();

    const processRequest = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var city = response.address.city;
        setcity(city);
        var pincode = response.address.postcode;
        demo(pincode);
        setpincode(pincode);
        return;
      }
    };
    console.log(
      "${process.env.REACT_APP_NODE_API}${process.env.REACT_APP_NODE_API}${process.env.REACT_APP_NODE_API}",
      `${process.env.REACT_APP_NODE_API}`
      );
      xhr.onreadystatechange = processRequest;
      xhr.addEventListener("readystatechange", processRequest, false);
    };
    
    async function demo(pin) {
      console.log("pinnumber.........", pin);
      await $.ajax({
          type : "GET",
          url : `https://api.postalpincode.in/pincode/${pin}`,
          success : await function (response){
              console.log("responseresponseresponseresponse",response);
                return setareaname(response[0].PostOffice[0].Name);
          }
      })
      await user(areaname)
    }

  const user = async(areaname) => {
    console.log(";popopropopopop",areaname);
    props.Areauser(areaname);
  };

  return (
    <div className="container mt-4">
      <button onClick={getCoordintes}>Data from around area you</button>
      <h2>{city}</h2>
      <h2>{pincode}</h2>
      <h2>{areaname}</h2>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Area name</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log("props.areaList.dataprops.areaList.dataprops.areaList.data",props.areaList.data)} */}
          
          {props.areaList.data ?
           ( props.areaList.data &&
            props.areaList.data.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.areaname}</td>
                </tr>
              );
            }))
            :
            ( props.eventList.data &&
              props.eventList.data.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.areaname}</td>
                  </tr>
                );
              }))
          }
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("dsxadsadasdads", state);
  return {
    eventList: state.Eventreducer.eventList,
    areaList: state.Eventreducer.areaList,
  };
};
const mapDistachToProps = (dispatch) => {
  return {
    Allevent: () => dispatch(Allevent()),
    Areauser: (data) => dispatch(Areauser(data))
  };
};

export default connect(mapStateToProps, mapDistachToProps)(App);
