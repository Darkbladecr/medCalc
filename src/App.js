import React, { Component } from 'react';
import { Header, Container, Grid, Button, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './app.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			patient: {
				age: 0,
				bp: 0,
				tia: 0,
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
		this.handleScore = this.handleScore.bind(this);
	}
	handleScore(e, { name, value }) {
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
		const { patient } = this.state;
		return (
			<div style={{ marginTop: '20px' }}>
				<Header as="h1" textAlign="center">
					ABCD<sup>2</sup> Score Calculator
				</Header>
				<Container text>
					<p>
						This is the basic ABCD<sup>2</sup> Score calculator. It will take in
						the age, systolic blood pressure, diastolic blood pressure, basic
						clinical features, duration and diabetic status and return the ABCD<sup>2</sup>{' '}
						score
					</p>
				</Container>
				<br />
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column textAlign="right" verticalAlign="middle">
							<b>Patient Age</b>
						</Grid.Column>
						<Grid.Column>
							<Button.Group>
								<Button
									active={patient.age === 0}
									name="age"
									value={0}
									onClick={this.handleScore}
								>
									&lt;60
								</Button>
								<Button.Or />
								<Button
									active={patient.age === 1}
									name="age"
									value={1}
									onClick={this.handleScore}
								>
									&ge;60
								</Button>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column textAlign="right" verticalAlign="middle">
							<b>Blood pressure &ge; 140/90 mmHg:</b>
							<br />
							<span>(either SBP &ge; 140 or DBP &ge; 90)</span>
						</Grid.Column>
						<Grid.Column>
							<Button.Group>
								<Button
									active={patient.bp === 0}
									name="bp"
									value={0}
									onClick={this.handleScore}
								>
									No
								</Button>
								<Button.Or />
								<Button
									active={patient.bp === 1}
									name="bp"
									value={1}
									onClick={this.handleScore}
								>
									Yes
								</Button>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column textAlign="right" verticalAlign="middle">
							<b>Clinical features of the TIA</b>
						</Grid.Column>
						<Grid.Column>
							<Button.Group vertical>
								<Button
									active={patient.tia === 0}
									name="tia"
									value={0}
									onClick={this.handleScore}
								>
									Other symptoms
								</Button>
								<Button
									active={patient.tia === 1}
									name="tia"
									value={1}
									onClick={this.handleScore}
								>
									Speech disturbance without weakness
								</Button>
								<Button
									active={patient.tia === 2}
									name="tia"
									value={2}
									onClick={this.handleScore}
								>
									Unilateral weakness
								</Button>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column textAlign="right" verticalAlign="middle">
							<b>Duration of symptoms</b>
						</Grid.Column>
						<Grid.Column>
							<Button.Group vertical>
								<Button
									active={patient.duration === 0}
									name="duration"
									value={0}
									onClick={this.handleScore}
								>
									&lt; 10 minutes
								</Button>
								<Button
									active={patient.duration === 1}
									name="duration"
									value={1}
									onClick={this.handleScore}
								>
									10-59 minutes
								</Button>
								<Button
									active={patient.duration === 2}
									name="duration"
									value={2}
									onClick={this.handleScore}
								>
									&ge; 60 minutes
								</Button>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column textAlign="right" verticalAlign="middle">
							<b>History of diabetes</b>
						</Grid.Column>
						<Grid.Column>
							<Button.Group>
								<Button
									active={patient.diabetic === 0}
									name="diabetic"
									value={0}
									onClick={this.handleScore}
								>
									No
								</Button>
								<Button.Or />
								<Button
									active={patient.diabetic === 1}
									name="diabetic"
									value={1}
									onClick={this.handleScore}
								>
									Yes
								</Button>
							</Button.Group>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Container>
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
