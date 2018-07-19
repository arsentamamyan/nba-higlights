import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const URL_TEAMS = 'http://localhost:3000/teams';

const fadeOptions = {
    classNames: "fade",
    timeout: {
        enter:500,
        exit: 500
    },
    enter: true,
    exit: true
}

class Teams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            filtered: [],
            keyword: ''
        }
    }

    componentDidMount(){
        fetch(URL_TEAMS, {method: 'GET'})
            .then(response =>response.json())
            .then(json => {
                this.setState({
                    teams: json,
                    filtered: json
                })
            })
    }

    searchTerm = (event) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const list = this.state.teams.filter((item) => {
                return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            })

            this.setState({
                filtered: list,
                keyword
            })
        } else {
            this.setState({
                filtered: this.state.teams,
                keyword
            })
        }
    }

    renderList = ({filtered}) => {
        return filtered.map((item) => {
            return(
                <CSSTransition key={item.id} {...fadeOptions}>
                    <div className="wrapper">
                        <Link to={`team/${item.name}`}>
                            <div className="team-item">
                                <img alt={item.name} src={`/images/teams/${item.logo}`}/>
                            </div>
                        </Link>
                    </div>
                </CSSTransition>
            )
        })
    }

    render(){
        return(
            <div className="teams-component">
                <div className="teams-input">
                    <input
                        type="text"
                        placeholder="Search for a team"
                        value={this.state.keyword}
                        onChange={event => this.searchTerm(event)}/>
                </div>
                <div className="teams-container">
                    <TransitionGroup className="fade">
                        {this.renderList(this.state)}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default Teams