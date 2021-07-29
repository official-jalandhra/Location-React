import axios from "axios";

export function setLoggedIn() {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGGED_IN",
    });
  };
}

export function Allevent()
{
    return(dispatch)=>{
        return axios.get(`${process.env.REACT_APP_NODE_API}/api/allevent`)
        .then((response)=>{
            dispatch({
                type:"EVENTGET_SUCCESS",
                message:"something went wrong",
                data:response.data
            })
        }).catch((error)=>{
            console.log("error",error)
            dispatch({
                type:"EVENTGET_FAILURE",
                message:"something went wrong"
            })
        })
    }
}

export function Areauser(areaname) {
  console.log(";;;;;;;;",areaname)
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_NODE_API}/api/allevent/${areaname}`)
      .then((response) => {
        dispatch({
          type: "AREA_SUCCESS",
          message: "area get list success",
          data: response.data,
        });
      })
      .catch(function (error) {
        dispatch({
          type: "AREA_FAILURE",
          message: "Something went wrong",
        });
      });
  };
}

