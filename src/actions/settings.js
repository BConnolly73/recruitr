import database from './../firebase/firebase';

export const getSettings = (settings) => ({
    type: 'GET_SETTINGS',
    settings
});

export const startGetSettings = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`settings`).once('value').then((snapshot) => {
            const settings = {};
            snapshot.forEach((childSnapshot) => {
                settings[childSnapshot.key] = {
                    ...childSnapshot.val()
                }
            });

            dispatch(getSettings(settings));
        });
    };
};

// Update Settings
export const updateSettings = (settings) => ({
    type: 'UPDATE_SETTINGS',
    settings
});

export const startUpdateSettings = (settingsData = {}) => {
    return (dispatch, getState) => {
        const settings = settingsData;

        return database.ref(`settings`).set(settings).then((ref) => {
            dispatch(updateSettings({...settings}))
        });
    };
};