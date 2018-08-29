import database from '../firebase/firebase';

export const addDrill = (drill) => ({
    type: 'ADD_DRILL',
    drill: drill
});

export const startAddDrill = (drillData = {}) => {
    console.log("HERE", drillData);
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
            description = '',
            measurements = []
        } = drillData;

        const drill = { name, description, measurements };

        return database.ref(`drills`).push(drill).then((ref) => {
            dispatch(addDrill({
                id: ref.key,
                ...drill
            }))
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