const initialState = {
    isInprogress: false,
    isError: false,
    message: "",
    status: null,
    eventList: {},
    areaList:{}
  };
  
  export default function EventReducer(state = initialState, action) {
    switch (action.type) {
      case "USER_INPROGRESS":
        return {
          ...state,
          isInprogress: true,   
          isError: false,
          message: "",
        };
  
      case "EVENTGET_SUCCESS":
        return {
          ...state,
          isInprogress: true,
          isError: false,
          message: action.messsage,
          eventList: action.data,
        };
      case "EVENTGET_FAILURE":
        return {
          ...state,
          isInprogress: false,
          isError: true,
          message: action.messsage,
        };
        case "AREA_SUCCESS":
          return {
            ...state,
            isInprogress: true,
            isError: false,
            message: action.messsage,
            areaList: action.data,
          };
          case "AREA_FAILURE":
            return {
              ...state,
              isInprogress: false,
              isError: true,
              message: action.messsage,
            };  
      default:
        return state;
    }
  }
  