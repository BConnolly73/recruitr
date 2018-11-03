import database from '../firebase/firebase';

export const addMeasurements = (measurement) => ({
    type: 'ADD_MEASUREMENTS',
    measurement: measurement
});

export const startAddMeasurements = (measurementData = [], role_id = 0) => {
    return (dispatch) => {
        measurementData.map((measurement) => {
            measurement = {
                ...measurement,
                'role_id': role_id
            };

            console.log(measurement);
            return database.ref(`role_measurements`).push(measurement).then((ref) => {
                dispatch(addMeasurements({
                    id: ref.key,
                    ...measurement
                }));
            });
        })
    }
}

export const setMeasurements = (measurements) => {
    return {
        type: 'SET_MEASUREMENTS',
        measurements: measurements
    }
}

export const startSetMeasurements = () => {
    return (dispatch, getState) => {
        return database.ref(`role_measurements`).once('value').then((snapshot) => {
            const measurements = [];
            snapshot.forEach((measurement) => {
                measurements.push({
                    id: measurement.key,
                    ...measurement.val()
                });
            });
            dispatch(setMeasurements(measurements));
        })
    }
}