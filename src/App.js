import React, { Component } from 'react';
import {
	Header,
	Container,
	Form,
	Label,
	Input,
	Statistic,
	Message,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			patient: {
				age: 0,
				systolic: 0,
				diastolic: 0,
				weakness: 0,
				speech: 0,
				duration: 0,
				diabetic: 0,
			},
			total: 0,
			risk: {
				range: '0-3',
				type: 'Low Risk',
				twoDay: '1.0%',
				sevenDay: '1.2%',
				nintyDay: '3.1%',
			},
		};
		this.handleInput = this.handleInput.bind(this);
		this.warningColor = this.handleInput.bind(this);
	}
	handleInput(e) {
		const target = e.target;
		const name = target.name;
		let value;
		if (name === 'age') {
			value = target.value >= 60 ? 1 : 0;
		} else if (name === 'systolic') {
			value = target.value >= 140 ? 1 : 0;
		} else if (name === 'diastolic') {
			value = target.value >= 90 ? 1 : 0;
		} else if (name === 'weakness') {
			value = target.checked ? 2 : 0;
		} else if (name === 'speech' || name === 'diabetic') {
			value = target.checked ? 1 : 0;
		} else if (name === 'duration') {
			value = target.value >= 60 ? 2 : target.value >= 10 ? 1 : 0;
		}
		const patient = { ...this.state.patient, [name]: value };
		const total = Object.values(patient).reduce((a, b) => a + b, 0);
		let risk;
		if (total < 4) {
			risk = {
				range: '0-3',
				type: 'Low Risk',
				twoDay: '1.0%',
				sevenDay: '1.2%',
				nintyDay: '3.1%',
			};
		} else if (total < 6) {
			risk = {
				range: '4-5',
				type: 'Moderate Risk',
				twoDay: '4.1%',
				sevenDay: '5.9%',
				nintyDay: '9.8%',
			};
		} else {
			risk = {
				range: '6-7',
				type: 'High Risk',
				twoDay: '8.1%',
				sevenDay: '11.7%',
				nintyDay: '17.8%',
			};
		}
		this.setState({
			patient,
			total,
			risk,
		});
	}
	render() {
		return (
			<div style={{ marginTop: '20px' }}>
				<Header as="h1" textAlign="center">
					ABCD<sup>2</sup> Score Calculator
				</Header>
				<Container text>
					<p>
						This is the basic ABCD<sup>2</sup> Score calculator. It will take in
						the age, systolic blood pressure, diastolic blood pressure, basic
						clinical features, duration and diabetic status and return the ABCD<sub>2</sub>{' '}
						score
					</p>
				</Container>
				<br />
				<Container>
					<Form size="small">
						<Form.Input
							inline
							label="Patient Age"
							type="number"
							name="age"
							min="0"
							onChange={this.handleInput}
						/>
						<Form.Field inline>
							<Input labelPosition="right" type="text">
								<Label basic>Systolic Blood Pressure</Label>
								<input
									name="systolic"
									type="number"
									min="0"
									step="10"
									onChange={this.handleInput}
								/>
								<Label>mmHg</Label>
							</Input>
						</Form.Field>
						<Form.Field inline>
							<Input labelPosition="right" type="text">
								<Label basic>Diastolic Blood Pressure</Label>
								<input
									name="diastolic"
									type="number"
									min="0"
									step="10"
									onChange={this.handleInput}
								/>
								<Label>mmHg</Label>
							</Input>
						</Form.Field>
						<Form.Field inline>
							<Input labelPosition="right" type="text">
								<Label basic>How long did the symptoms last</Label>
								<input
									name="duration"
									type="number"
									min="0"
									onChange={this.handleInput}
								/>
								<Label>minutes</Label>
							</Input>
						</Form.Field>
						<Form.Input
							inline
							label="Did the patient have unilateral weakness?"
							name="weakness"
							type="checkbox"
							onChange={this.handleInput}
						/>
						<Form.Input
							inline
							label="Did the patient have any speech disturbance?"
							name="speech"
							type="checkbox"
							onChange={this.handleInput}
						/>
						<Form.Input
							inline
							label="Is the patient diabetic?"
							name="diabetic"
							type="checkbox"
							onChange={this.handleInput}
						/>
					</Form>
					<div className="ui statistic" style={{ display: 'flex' }}>
						<div className="value">
							{this.state.total}
						</div>
						<div className="label">
							The ABCD<sup>2</sup> score
						</div>
					</div>
					<Message>
						<Message.Header>What does this score mean?</Message.Header>
						<Message.List>
							<Message.Item>
								{this.state.risk.range} points: {this.state.risk.type}
							</Message.Item>
							<Message.Item>
								2-Day Stroke Risk: {this.state.risk.twoDay}
							</Message.Item>
							<Message.Item>
								7-Day Stroke Risk: {this.state.risk.sevenDay}
							</Message.Item>
							<Message.Item>
								90-Day Stroke Risk: {this.state.risk.nintyDay}
							</Message.Item>
						</Message.List>
					</Message>
				</Container>
			</div>
		);
	}
}

export default App;
