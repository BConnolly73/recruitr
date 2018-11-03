const selectRolesByDrillId = (drill_id, roles, measurements) => {
    return roles.filter((role) => {
        if (role.drill_id === drill_id) {
            return {
                ...role,
                measurements: measurements.filter((measurement) => {
                    return measurement.role_id === role.id
                })
            }
        }
    });
}

export { selectRolesByDrillId };