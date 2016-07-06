import constants from '../constants';

function routerLocationDidUpdate(location) {
    return {
        type: constants.ROUTER_LOCATION_DID_UPDATE,
        location
    }
}

export {
routerLocationDidUpdate
}