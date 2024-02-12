import react from 'react'
import htm from 'htm'
import { RecentGithubProjects }from './RecentGithubProjects.js'

const html = htm.bind(react.createElement)

export class App extends react.Component {
    constructor(props) {
        super();
        this.state = {
            query: 'javascript',
            label: 'Javascript'
        }
        this.setQuery = this.setQuery.bind(this)
    }

    setQuery(e) {
        e.preventDefault()
        const label = e.currentTarget.text
        this.setState({labe, query: label.toLowerCase})
    }

    render () {
        return html``
    }
}