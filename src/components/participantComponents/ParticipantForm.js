import React from 'react';
// import Camera from 'react-camera';
// import { relative } from 'upath';

export default class ParticipantForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: props.participant ? props.participant.first_name : '',
            last_name: props.participant ? props.participant.last_name : '',
            email: props.participant ? props.participant.email : '',
            year: props.participant ? props.participant.year : 0,
            position: props.participant ? props.participant.position : 0,
            team: props.participant ? props.participant.team : 0,
            about: props.participant ? props.participant.about : '',
            error: ''
        };

        //this.takePicture = this.takePicture.bind(this);
    }

    // takePicture() {
    //     this.camera.capture().then(blob => {
    //         this.img.src = URL.createObjectURL(blob);
    //         this.img.onload = () => { URL.revokeObjectURL(this.src); }
    //     });
    // }

    componentDidMount() {
        document.getElementById('year').selectedIndex = this.state.year;
        document.getElementById('position').selectedIndex = this.state.position;
        document.getElementById('team').selectedIndex = this.state.team;
    }

    onFirstNameChange = (e) => {
        const first_name = e.target.value;
        this.setState(() => ({ first_name : first_name }));
    }

    onLastNameChange = (e) => {
        const last_name = e.target.value;
        this.setState(() => ({ last_name : last_name }));
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email : email }));
    }

    onYearChange = (e) => {
        const year = e.target.value;
        this.setState(() => ({ year : year }));
    }

    onPositionChange = (e) => {
        const position = e.target.value;
        this.setState(() => ({ position : position }));
    }

    onTeamChange = (e) => {
        const team = e.target.value;
        this.setState(() => ({ team : team }));
    }

    onAboutChange = (e) => {
        const about = e.target.value;
        this.setState(() => ({ about : about }));
    }

    //Validates Data
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.first_name || !this.state.last_name) {
            this.setState(() => ({ error: 'Please provide a name' }));
        } else if (!this.state.email) {
            this.setState(() => ({ error: 'Please provide a email' }));
        } else if (this.state.year === 0) {
            this.setState(() => ({ error: 'Please provide a year of study' }));
        } else if (this.state.position === 0) {
            this.setState(() => ({ error: 'Please provide a desired position' }));
        } else if (this.state.team === 0) {
            this.setState(() => ({ error: 'Please provide desired team' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                year: this.state.year,
                position: this.state.position,
                team: this.state.team,
                about: this.state.about,
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="form">
                {this.state.error && (<p className="form__error">ERROR: {this.state.error}</p>)}
                <input
                    type="text"
                    placeholder="First Name"
                    value={this.state.first_name}
                    onChange={this.onFirstNameChange}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    onChange={this.onLastNameChange}
                />

                <input
                    type="text"
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                />

                <select
                    onChange={this.onYearChange}
                    id="year"
                >
                    <option
                        value={0}
                    >Year of Study</option>
                    <option
                        value={1}
                    >First Year</option>
                    <option
                        value={2}
                    >Second Year</option>
                    <option
                        value={3}
                    >Third Year</option>
                    <option
                        value={4}
                    >Fourth Year</option>
                    <option
                        value={5}
                    >Fourth Year + </option>
                    <option
                        value={6}
                    >Graduate Student</option>
                    <option
                        value={7}
                    >Not A Student</option>
                </select>

                <select
                    onChange={this.onPositionChange}
                    id="position"
                >
                    <option
                        value={0}
                    >Desired Position</option>
                    <option
                        value={1}
                    >Keeper</option>
                    <option
                        value={2}
                    >Chaser</option>
                    <option
                        value={3}
                    >Beater</option>
                    <option
                        value={4}
                    >Any</option>
                </select>

                <select
                    onChange={this.onTeamChange}
                    id="team"
                >
                    <option
                        value={0}
                    >Desired Team</option>
                    <option
                        value={1}
                    >University of Guelph Gryphons</option>
                    <option
                        value={2}
                    >Royal City Quidditch</option>
                    <option
                        value={3}
                    >Any</option>
                </select>

                <textarea
                    placeholder="Enter additional information about you"
                    value={this.state.about}
                    onChange={this.onAboutChange}
                ></textarea>

                {
                    // (<div style={{position: 'relative', width: '40%', height: '40%'}}>
                    //     <Camera
                    //         style={camera_style.preview}
                    //         ref={(cam) => {
                    //             this.camera = cam;
                    //         }}
                    //     />
                    //     <div style={camera_style.captureContainer} onClick={this.takePicture}>
                    //         <div style={camera_style.captureButton} />
                    //     </div>
                    //     <img
                    //         style={camera_style.captureImage}
                    //         ref={(img) => {
                    //             this.img = img;
                    //         }}
                    //     />
                    // </div>
                    // )
                }

                <div>
                    <button>Save Participant</button>
                </div>

            </form>
        )
    }
}

// const camera_style = {
//     preview: {
//       position: 'relative',
//     },
//     captureContainer: {
//       display: 'flex',
//       position: 'absolute',
//       justifyContent: 'center',
//       zIndex: 1,
//       bottom: 0,
//       width: '50%'
//     },
//     captureButton: {
//       backgroundColor: '#fff',
//       borderRadius: '50%',
//       height: 56,
//       width: 56,
//       color: '#000',
//       margin: 20
//     },
//     captureImage: {
//       width: '100%',
//     }
//   };
