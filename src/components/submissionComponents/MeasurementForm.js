import React from 'react';
import InputNumber from 'rc-input-number';

class MeasurementForm extends React.Component {
    constructor(props) {
        super(props);

        this.getCurrentValue = this.getCurrentValue.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    getCurrentValue(roleValues, roleIndex, measurementIndex) {
        if (typeof roleValues === 'undefined') {
            return 0;
        } else if (typeof roleValues[roleIndex] === 'undefined') {
            return 0;
        } else if (typeof roleValues[roleIndex][measurementIndex] === 'undefined') {
            return 0;
        }

        return roleValues[roleIndex][measurementIndex];
    }

    onChange(value, measurementIndex) {
        const { roleIndex, onMeasurementChange } = this.props;
        console.log(`To change method ${value}, ${roleIndex}, ${measurementIndex}`);
        onMeasurementChange(value, roleIndex, measurementIndex);
    }

    render() {
        const { role, roleIndex, roleValues } = this.props;

        return (
            <div className="submit_drill_measurements_container">
                {role.measurements.map((measurement, index) => {
                    const currentValue = this.getCurrentValue(roleValues, roleIndex, index);
                    return (
                        <div key={`measurement_${index}`}>
                            <p>Measurement: {measurement.name}</p>
                            {
                                <InputNumber
                                    min={0}
                                    max={(measurement.type == 1) ? 10 : 100000}
                                    precision={(measurement.type == 1) ? 0 : 2}
                                    placeholder={(measurement.type == 1) ? 'Enter Value' : 'Enter Time'}
                                    onChange={(e) => { this.onChange(e, index) }}
                                    value={currentValue}
                                />
                            }
                        </div>
                        )
                    })}
            </div>
        );
    }
}

export { MeasurementForm as default };
