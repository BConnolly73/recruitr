import database from '../firebase/firebase';

export const addResults = (result) => ({
    type: 'ADD_RESULTS',
    result: result
});

export const startAddResults = (resultData = [], path) => {
    return (dispatch) => {
        return database.ref(`${path}`).push(resultData).then((ref) => {
            dispatch(addResults({
                id: ref.key,
                ...resultData
            }))
        });
    }
}

export const setResults = (results) => {
    return {
        type: 'SET_RESULTS',
        results: results
    }
}

export const startSetResults = () => {
    return (dispatch) => {
        return database.ref(`results`).once('value').then((snapshot) => {
            const results = [];
            snapshot.forEach((result) => {
                results.push({
                    id: result.key,
                    ...result.val()
                });
            });

            dispatch(setResults(results));
        })
    }
}