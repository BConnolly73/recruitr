import React from 'react';
import {id_to_measurement_type} from '../../selectors/id_to_string'; 

const RoleAndMeasurementDisplay = (props) => (
    <div>
        <h3>Roles</h3>
        {props.roles.map((role, r_index) => {
                return (
                    <div key={r_index}>
                        <h5>{role.name}</h5>
                        {role.measurements.map((measurement, m_index) => {
                            return (
                                <div key={m_index}>
                                    <p>Measurement: {measurement.name}</p>
                                    <p>Type: {id_to_measurement_type(measurement.type)}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
    </div>
);

export { RoleAndMeasurementDisplay as default };