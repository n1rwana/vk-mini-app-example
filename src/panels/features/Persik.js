import React, { Component } from 'react'
import { Group, Panel, PanelSpinner } from '@vkontakte/vkui';

import PersikImg from '../../img/persik.png';
import './Persik.css';

export default class Persik extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.setLoading(false);
	}

	render() {
		return (
			<Panel id={this.props.id}>
				{this.props.isLoading ? <PanelSpinner /> :
					<Group>
						<img className="Persik" src={PersikImg} alt="Persik The Cat" />
					</Group>
				}
			</Panel>
		)
	}
}