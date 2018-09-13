const getAllResults = (results) => {
    let organized = [];
    let final = {};
    results.map((result) => {
        organized[result.id] = {
            ...result
        };
    });

    let participant_id = '';
    let drill_id = '';
    let role_id = '';
    let measurement_id = '';
    let sum = 0;
    let count = 0;

    for (let [p1, participant] of Object.entries(organized)) {
        for (let [a,b] of Object.entries(participant)) {
            if (a === 'id') {
                final = addParticipantId(final, b);
                participant_id = b;
            } else {
                final = addDrillId(final, participant_id, a);
                drill_id = a;
                for (let [role, measurements] of Object.entries(b)) {
                    final = addRoleId(final, participant_id, drill_id, role);
                    role_id = role;
                    for (let [measurement_id, values] of Object.entries(measurements)) {
                        addMeasurementId(final, participant_id, drill_id, role_id, measurement_id);
                        measurement_id = measurement_id;
                        for (let [value_id, value] of Object.entries(values)) {
                            sum = sum + value.value;
                            count = count + 1;
                        }

                        final[participant_id][drill_id][role_id][measurement_id]['player_average'] = (sum/count);
                        sum = 0;
                        count = 0;
                    }
                }
            }
        }
    }

    //console.log(final);
    return final;
}

const addParticipantId = (final, participant_id) => {
    if (final[participant_id] === undefined) {
        final[participant_id] = {};
    }

    return final;
}

const addDrillId = (final, participant_id, drill_id) => {
    if (final[participant_id][drill_id] === undefined) {
        final[participant_id][drill_id] = {};
    }

    return final;
}

const addRoleId = (final, participant_id, drill_id, role_id) => {
    if (final[participant_id][drill_id][role_id] === undefined) {
        final[participant_id][drill_id][role_id] = {};
    }

    return final;
}

const addMeasurementId = (final, participant_id, drill_id, role_id, measurement_id) => {
    if (final[participant_id][drill_id][role_id][measurement_id] === undefined) {
        final[participant_id][drill_id][role_id][measurement_id] = {};
    }

    return final;
}

export { getAllResults as default};