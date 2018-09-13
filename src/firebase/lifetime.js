import database from '../firebase/firebase';

const updateAverageResults = () => {
    database.ref('results').on('value', (snap) => {
        const results = [];
        let average_result = {};
        snap.forEach((result) => {
            results.push({
                id: result.key,
                ...result.val()
            })
        });

        buildAverageResult(average_result, results);
        average_result = averageAllParticipantsValues(average_result);

        database.ref('average').set(average_result);
        return average_result;
    });
}

const buildAverageResult = (average_result, results) => {
    results.map((player) => {
        for (let [drill_tag, drill] of Object.entries(player)) {
            const drill_id = getDrillIdFromTag(drill_tag);
            addDrillTagIfNew(average_result, drill_id);

            if (typeof drill === 'object') {
                for (let [role_tag, role] of Object.entries(drill)) {
                    addRolesIfNew(average_result, drill_id, role_tag);

                    for (let [measurement_name, measurement] of Object.entries(role)) {
                        addMeasurementIfNew(average_result, drill_id, role_tag, measurement_name);

                        for (let [a, value] of Object.entries(measurement)) {
                            average_result[drill_id][role_tag][measurement_name].push(value.value);
                        }
                    }
                }
            }
        }
    });
}

const averageAllParticipantsValues = (average_result) => {
    let i = 0;
    for (let [drill_id, drill] of Object.entries(average_result)) {
        for (let [role_id, role] of Object.entries(drill)) {
            for (let [measurement_name, measurement] of Object.entries(role)) {
                let sum = 0;
                for (let [a, value] of Object.entries(measurement)) {
                    sum = sum + value;
                }

                average_result[drill_id][role_id][measurement_name] = {};
                average_result[drill_id][role_id][measurement_name]['average'] = (sum / measurement.length);
            }
        }
    }

    return average_result;
}

const getDrillIdFromTag = (tag) => {
    return tag.substring(0, 21) === 'id' ? null : tag.substring(0, 21);
}

const addDrillTagIfNew = (average_result, drill_id) => {
    if (average_result[drill_id] !== undefined || drill_id === null) {
        return average_result;
    } else {
        average_result[drill_id] = {};
        return average_result;
    }
}

const addRolesIfNew = (average_result, drill_id, role_id) => {
    if (average_result[drill_id][role_id] !== undefined || role_id === null) {
        return average_result;
    } else {
        average_result[drill_id][role_id] = {};
        return average_result;
    }
}

const addMeasurementIfNew = (average_result, drill_id, role_id, measurement_name) => {
    if (average_result[drill_id][role_id][measurement_name] !== undefined || measurement_name === null) {
        return average_result;
    } else {
        average_result[drill_id][role_id][measurement_name] = [];
        return average_result;
    }
}

export { updateAverageResults as default };