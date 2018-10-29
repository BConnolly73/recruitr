import database from '../firebase/firebase';

import { startAddMeasurements } from './measurements';

export const addRoles = (role) => ({
    type: 'ADD_ROLES',
    role: role
});

export const startAddRoles = (roleData = [], drill_id = 0) => {
    return (dispatch) => {
        roleData.map((role) => {
            role = {
                ...role,
                'drill_id':   drill_id
            };

            return database.ref(`drill_roles`).push(role).then((ref) => {
                dispatch(addRoles({
                    id: ref.key,
                    ...role,
                    measurements: null
                }));

                dispatch(startAddMeasurements(role.measurements, ref.key));
            });
        })
    }
}

export const setRoles = (roles) => {
    return {
        type: 'SET_ROLES',
        roles: roles
    }
}

export const startSetRoles = () => {
    return (dispatch, getState) => {
        return database.ref(`drill_roles`).once('value').then((snapshot) => {
            const roles = [];
            snapshot.forEach((drill) => {
                roles.push({
                    id: role.key,
                    ...role.val()
                });
            });
            dispatch(setRoles(role));
        })
    }
}