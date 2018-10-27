const id_to_measurement_type = (id) => {
    switch (parseInt(id)) {
        case 1:
            return 'Out of 10';
        case 2:
            return 'Time';
        case 3:
            return 'Count';
        default:
            return 'Unknown Measurement Type';
    }
}

const id_to_year = (id) => {
    switch (parseInt(id)) {
        case 1:
            return 'First Year';
        case 2:
            return 'Second Year';
        case 3:
            return 'Third Year';
        case 4:
            return 'Fourth Year';
        case 5:
            return 'Fourth Year +';
        case 6:
            return 'Gratuate Student';
        case 7:
            return 'Not a Student';
        default:
            return 'Unknown Year';
    }
}

const id_to_position = (id) => {
    switch (parseInt(id)) {
        case 1:
            return 'Keeper';
        case 2:
            return 'Chaser';
        case 3:
            return 'Beater';
        case 4:
            return 'Any';
        default:
            return 'Unknown Position';
    }
}

const id_to_team = (id) => {
    switch (parseInt(id)) {
        case 1:
            return 'University of Guelph';
        case 2:
            return 'Royal City';
        case 3:
            return 'Any';
        default:
            return 'Unknown Team';
    }
}

export {
    id_to_measurement_type,
    id_to_year,
    id_to_position,
    id_to_team
}