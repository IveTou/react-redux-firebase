import { map } from 'lodash';

export const setTargetUserId = tuid => {
  return dispatch => {
    dispatch({ type: 'SET_TARGET_SUCCESS', tuid});
  }
}

export const setMaps = maps => {
  return dispatch => {
    dispatch({ type: 'SET_MAP_SUCCESS', maps});
  }
}

export const getDirections = (ori, des, way) => {
  return dispatch => {
    const googleMaps = window.google.maps;
    const DirectionsService = new googleMaps.DirectionsService();
    
    const origin = ori.placeId ?
      { placeId: ori.placeId} : 
      { lat: ori.value.address.latitude, lng:  ori.value.address.longitude };

    const destination = des.placeId ?
      { placeId: des.value.address.placeId} : 
      { lat: des.value.address.latitude, lng:  des.value.address.longitude };

    const waypoints = way ? 
      map(way, ({ location, stopover }) => {
        const loc =  location.placeId ?
          { placeId: location.placeId} : 
          { lat: location.latitude, lng:  location.longitude };

        return { location: loc, stopover };
      }) :
      null;
    
    DirectionsService.route(
      {
        origin,
        destination,
        travelMode: googleMaps.TravelMode.WALKING,
        drivingOptions: {
          departureTime: new Date(Date.now()),
        },
        waypoints: waypoints  || [],
        optimizeWaypoints: true,//Maybe it is worth to tell users about this rearrange
        avoidFerries: true,
        region: 'BR',
      }, 
      (result, status) => {
        if (status === googleMaps.DirectionsStatus.OK) {
          dispatch({ type: 'GET_DIRECTIONS_SUCCESS', result});
        } else {
          dispatch({ type: 'GET_DIRECTIONS_ERROR', status});
        }
      }
    );
  }
}

export const eraseDirections = () => {
  return dispatch => {
    dispatch({ type: 'ERASE_DIRECTIONS_SUCCESS'});
  }
}

export const updateDirections = () => {
  return (dispatch, getState, { getFirebase }) => {
    //const adressState = getState().activity.address;
  }
}