import react from 'react'
import ReactDOM from 'react-dom'
import htm from 'htm'
import { App } from './App.js'

const h = react.createElement

// class Hello extends react.Component {
//     render() {
//         return h('h1', null, [
//             'hello',
//             this.props.name || 'world'
//         ])
//     }
// }
//
// ReactDOM.render(
//     h(Hello, { name: 'react'}),
//     document.getElementsByTagName('body')[0]
// )

// class Hello extends react.Component {
//     render() {
//         return <h1>Hello {this.props.name || 'world'}</h1>
//     }
// }
//
// ReactDOM.render(
//     <Hello name='react'/>,
//     document.getElementsByTagName('body')[0]
// )

const html = htm.bind(react.createElement)

ReactDOM.render(
    html`<${App}/>`,
    document.getElementsByTagName('body')[0]
)