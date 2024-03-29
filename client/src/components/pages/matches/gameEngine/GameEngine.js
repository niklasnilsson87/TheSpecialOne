import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import Counter from '../Counter'
import MilliCounter from '../MilliCounter'
import uuid from 'uuid'
import { updatePoints } from '../../../../actions/editActions'
import PropTypes from 'prop-types'
import { sendReport } from '../../../../actions/reportActions'


/**
 * Component for GameEngine.
 *
 * @class GameEngine
 * @extends {Component}
 */
class GameEngine extends Component {
  state = {
    isEnd: false,
    homeGoals: 0,
    awayGoals: 0,
    events: ['Game started!'],
    counter: 0,
    awayTeamPlayers: [],
    randomEvents: [
      `' The home crowd is singing and sets of fireworks to cheer for there team.`,
      `' What is that? is that a cat running around on the pitch?`,
      `' The camera spots Josè Mourinho in the audiens today. Maybe looking to replace the home team manager?`,
      `' The away crowd is singing and creating a nice atmosphere in the stadium.`,
      `' This is a very tough match for the awayteam.`,
      `' The ball boy behind the away goalkeeper is the home managers son. Is he going to try and manipulate the away team golie?`
    ]
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentDidMount() {
    const { homeTeamPlayers, awayTeamPlayers, homeTeamValue, awayTeamValue } = this.props.stateFromManager
    const { awayTeamManager, homeTeamManager } = this.props.stateFromManager

    // Set match interval.
    this.match = setInterval(() => {
      let hp = homeTeamPlayers[this.randomEvents(homeTeamPlayers.length - 1)]
      let ap = awayTeamPlayers[this.randomEvents(awayTeamPlayers.length - 1)]
      
      // When match is over.
      if (this.state.counter === 90 ) {
        this.setState({
          isEnd: true, }, 
          () => {
            this.winLose(awayTeamManager)
            const matchReport = {
              homeTeamGoals: this.state.homeGoals,
              awayTeamGoals: this.state.awayGoals,
              awayTeam: awayTeamManager.teamName,
              homeTeam: homeTeamManager.teamName,
              report: this.state.events
            }
            
            this.props.sendReport(matchReport)
          })
        clearInterval(this.match)
      }

      // Game engine that creates events and goals.
      this.engine(hp, ap, homeTeamValue, awayTeamValue)

    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.match)
  }

  randomEvents = (number) => {
    return Math.floor(Math.random() * number) + 1 
  }

  counter = (e) => {
    this.setState({ counter: e.counter })
  }

  /**
   * Creates Events from randomEvents func.
   * When random event is hit then it adds it to the event array.
   *
   * @memberof GameEngine
   */
  engine = (hp, ap, homeTeamValue, awayTeamValue) => {
    let { homeGoals, awayGoals } = this.state

    let playerTotalValueEvent = this.randomEvents(160)
    let teamTotalValueEvent = this.randomEvents(200)
    let awayTeamAttackingEvent = this.randomEvents(160)
    let awayTeamAttackingSecondEvent = this.randomEvents(160)
    let homeTeamAttackingEvent = this.randomEvents(160)
    let homeTeamAttackingSecondEvent = this.randomEvents(160)
    let eventOccure = this.randomEvents(400)
    let eventCollection = this.randomEvents(this.state.randomEvents.length -1)

    if (playerTotalValueEvent === this.state.counter) {
      if (hp.totalValue > ap.totalValue) {
        this.setState({ 
          homeGoals: homeGoals += 1,
          events: [...this.state.events, `${this.state.counter}' GOOOOOOAAAALLL!!! ${hp.firstname} ${hp.lastname} scores the goal for ${hp.team}.`] })
      } else {
        this.setState({
          awayGoals: awayGoals += 1,
          events: [...this.state.events, `${this.state.counter}' Very good tackle by ${ap.firstname} ${ap.lastname} he takes the ball dribbles in front of the ${hp.team}s penalty area and shoots and SCORES!!!! `]
        })
      }
    }

    if (awayTeamAttackingSecondEvent === this.state.counter) {
      if (ap.attributes.physical.stamina > hp.attributes.mental.workRate) {
        this.setState({ 
          events: [...this.state.events, `${this.state.counter} ${ap.firstname} ${ap.lastname} runs at the ${hp.team}s defence and shoots...`] 
        })
          if(ap.attributes.tecnical.finishing + ap.attributes.physical.jumping + ap.attributes.physical.strength > hp.attributes.physical.strength + hp.attributes.tecnical.heading + hp.attributes.physical.balance) {
            this.setState({
            awayGoals: awayGoals += 1,
            events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! for ${ap.team} ${ap.lastname} heads it passed the goalkeeper with a well placed header!`] 
            })
          } else {
            this.setState({ 
              events: [...this.state.events, `${this.state.counter} ${hp.firstname} ${hp.lastname} clears the ball up the pitch for ${hp.team} at the last second.`] 
            })
        } 
      } else {
        this.setState({
          events: [...this.state.events, `${this.state.counter} ${ap.firstname} ${ap.lastname} looks tiered out there on the pitch today ${hp.firstname} ${hp.lastname} says "Thank you" and just takes the ball easy from ${ap.lastname}.`] 
        })
      }
    }
  


    if (awayTeamAttackingEvent === this.state.counter) {
      if (ap.attributes.tecnical.dribbling > hp.attributes.mental.positioning) {
      this.setState({ 
        events: [...this.state.events, `${this.state.counter} ${ap.firstname} ${ap.lastname} goes through the defense and fires...`]
      })
        if (ap.attributes.tecnical.finishing + ap.attributes.mental.concentration + ap.attributes.physical.speed > hp.attributes.mental.aggression + hp.attributes.tecnical.marking + hp.attributes.mental.concentration) {
          this.setState({
            awayGoals: awayGoals += 1,
            events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! for ${ap.team} ${ap.lastname} scores with a wonderfull finish in the bottom right corner...`]
          })
        } else {
          this.setState({
            events: [...this.state.events, `${this.state.counter}' Blocked by ${hp.firstname} ${hp.lastname} and cleared up the pitch.`]
          })
        }
      } else {
        this.setState({ 
          events: [...this.state.events, `${this.state.counter} ${ap.firstname} ${ap.lastname} tries to dribble around ${hp.firstname} ${hp.lastname} but ${hp.lastname} gave him a lesson in defending.`]
        })
      }
    }

    if (homeTeamAttackingSecondEvent === this.state.counter) {
      if (hp.attributes.tecnical.crossing > ap.attributes.physical.speed) {
        this.setState({
          events: [...this.state.events, `${this.state.counter} ${hp.team}s ${hp.lastname} gets passed one defender by the right hand side of the pitch and tries to cross the ball into the box...`]
        })
          if (hp.attributes.tecnical.heading + hp.attributes.physical.jumping + hp.attributes.physical.strength > ap.attributes.physical.strength + ap.attributes.tecnical.heading + ap.attributes.physical.balance) {
            this.setState({
            homeGoals: homeGoals += 1,
            events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! ${ap.lastname} heads the ball of the crossbar and in! magic play from ${hp.team}`] 
          })
          } else {
            this.setState({
              events: [...this.state.events, `${this.state.counter} ${ap.firstname} ${ap.lastname} steals the ball! can he perhaps start a counter attack?`]
            })
        } 
      } else {
        this.setState({
          events: [...this.state.events, `${this.state.counter} ${hp.firstname} ${hp.lastname} missed the ball when he tried to cross it in to his teammates...`]
        })
      }
    }

    if (teamTotalValueEvent === this.state.counter) {
      if (homeTeamValue > awayTeamValue) {
        this.setState({
          homeGoals: homeGoals += 1,
          events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! ${hp.lastname} scores a banger from 30 yards just under the crossbar.`]
        })
      } else {
        this.setState({
          awayGoals: awayGoals += 1,
          events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! ${ap.lastname} scores a header from a corner.`]
        })
      }
    }

    if (eventOccure === this.state.counter) {
      this.setState({
        events: [...this.state.events, this.state.counter + this.state.randomEvents[eventCollection]]
      })
    }

    if (homeTeamAttackingEvent === this.state.counter) {
      if (hp.attributes.mental.teamWork > ap.attributes.mental.workRate) {
        this.setState({
          events: [...this.state.events, `${this.state.counter}' ${hp.firstname} ${hp.lastname} is really showing his intelligence to set up his teammates with smart and simple passes`]
        })
        if (hp.attributes.tecnical.passing + hp.attributes.mental.composure + hp.attributes.physical.stamina > ap.attributes.physical.balance + ap.attributes.mental.bravery + ap.attributes.physical.strength) {
          this.setState({
            homeGoals: homeGoals += 1,
            events: [...this.state.events, `${this.state.counter}' GOOOOOOAAAALLL!!! Magic play from ${hp.team} to set up ${hp.lastname} in a good position to let him do a tap-in goal 2 feet from the goal line!`]
          })
        } else {
          this.setState({
            events: [...this.state.events, `${this.state.counter}' Turns out that ${ap.team} was not going to be fooled this time as ${ap.firstname} ${ap.lastname} made a great interception`]
          })
        }
      } else {
        this.setState({
          events: [...this.state.events, `${this.state.counter}' ${hp.firstname} ${hp.lastname} seemed to have left his brain at home and tries to dribble the ball for as long as possible even though there where 3 players left alone in the box.`]
        })
      }
    }
  }

 // Push scroll to bottom on new event.
 scrollToBottom = () => {
  if (this.state.counter < 90) {
    const container = ReactDOM.findDOMNode(this.messageContainer)
    container.scrollTop = container.scrollHeight
  }
}

 /**
  * Sends iformation to server to update points.
  *
  * @memberof GameEngine
  */
 winLose = (awayTeamManager) => {
    const lastGame = Date.now()
    if (this.state.homeGoals > this.state.awayGoals) {
      this.props.updatePoints(this.props.auth.user, awayTeamManager, 3, lastGame, 'win')
    } else if (this.state.homeGoals === this.state.awayGoals) {
      this.props.updatePoints(this.props.auth.user, awayTeamManager, 1, lastGame, 'draw')
    } else {
      this.props.updatePoints(this.props.auth.user, awayTeamManager, 3, lastGame, 'lose')
    }
}

render () {
    const { homeTeamManager, awayTeamManager } = this.props.stateFromManager
    const { events, isEnd, homeGoals, awayGoals } = this.state
    let event = events.map(e => {
      return (
      <div key={uuid()} className='mt-2 mb-2'>
        <p>{e}</p>
      </div>
      )
    })

    
    const whoWins = (
      <React.Fragment>
        <p className="text-center final-result">{homeTeamManager.teamName} {homeGoals} - {awayGoals} {awayTeamManager.teamName}</p>
        <div className="win-lose-draw final-result text-center">
        { homeGoals > awayGoals && <span>You Won! You get 3 manager points</span> }
        { homeGoals === awayGoals && <span> It´s a draw! You get 1 manager point</span> }
        { homeGoals < awayGoals && <span>You Loose! Better luck next time!</span> }
        </div>
        <p
        style={{cursor: 'pointer'}}
        className="font-weight-bold text-center"
        onClick={() => this.setState({isEnd: false})}
        >
          view match report
        </p>
      </React.Fragment>
    )

    const date = new Date().toDateString()
    
    return (
      <div>
        <div className="game-board">
          <p className="text-center">{date}</p>
          <p className='text-center'><Counter onCounterUpdate={this.counter}/> : <MilliCounter /></p>
          <div className='flex text-center align-items-center'>
            <span className='col-4'>{homeTeamManager.teamName}</span>
            <span className='col-1'>{this.state.homeGoals}</span>
            <span className='col-1'>:</span>
            <span className='col-1'>{this.state.awayGoals}</span>
            <span className='col-4'>{awayTeamManager.teamName}</span>
          </div>
        </div>
        <div className="game-event" ref={(el) => this.messageContainer = el}>
          { isEnd ? whoWins : event }
        </div>
      </div>
    )
  }
}

GameEngine.propTypes = {
  updatePoints: PropTypes.func.isRequired,
  sendReport: PropTypes.func.isRequired
}

// Function to get states for global store.
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { sendReport, updatePoints })(GameEngine)
