import database from '../firebase/firebase';

import { startAddRoles } from './roles';

export const addDrill = (drill) => ({
    type: 'ADD_DRILL',
    drill: drill
});

export const startAddDrill = (drillData = {}) => {
    return (dispatch) => {
        const {
            name = '',
            description = '',
            roles = []
        } = drillData;

        const drill = { name, description, roles };

        return database.ref(`drills`).push(drill).then((ref) => {
            //TODO: Remove roles from here
            dispatch(addDrill({
                id: ref.key,
                ...drill
            }));

            dispatch(startAddRoles(drill.roles, ref.key));
        });
    }
}

export const setDrills = (drills) => {
    return {
        type: 'SET_DRILLS',
        drills: drills
    }
}

export const startSetDrills = () => {
    return (dispatch, getState) => {
        return database.ref(`drills`).once('value').then((snapshot) => {
            const drills = [];
            snapshot.forEach((drill) => {
                drills.push({
                    id: drill.key,
                    ...drill.val()
                });
            });
            dispatch(setDrills(drills));
        })
    }
}

export const editDrill = (id, updates) => ({
    type: 'EDIT_DRILL',
    id: id,
    updates: updates
});

export const startEditDrill = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`drills/${id}`).update(updates).then(() => {
            dispatch(editDrill(id, updates));
        });
    }
}