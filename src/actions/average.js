import updateAverageResults from '../firebase/lifetime';
import database from '../firebase/firebase';

export const setAverage = (average) => {
    updateAverageResults();
    return {
        type: 'SET_AVERAGE',
        average: average
    }
}

export const startSetAverage = () => {
    return (dispatch) => {
        return database.ref(`average`).once('value').then((snapshot) => {
            const average = [];
            snapshot.forEach((result) => {
                average.push({
                    id: result.key,
                    ...result.val()
                });
            });

            dispatch(setAverage(average));
        })
    }
}