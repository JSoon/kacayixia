import constants from '../constants';

const routerLocation = (state = {}, action) => {
    switch (action.type) {
        case constants.ROUTER_LOCATION_DID_UPDATE:
            return Object.assign({}, state, action.location);
        default:
            return state;
    }
}

export default routerLocation;