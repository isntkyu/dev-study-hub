import { OfflineState } from './offlineState.js'
import { OnlineState } from './onlineState.js'

export class FailsafeSocket {
    constructor(options) {
        this.options = options
        this.queue = []
        this.currentState = null
        this.socket = null
        this.states = {
            offline: new OfflineState(this),
            online: new OnlineState(this)
        }
        this.changeState('offline')
    }

    changeState(state) {
        this.currentState = this.states[state]
        this.currentState.activate()
    }

    send(data) {
        // queue에 push 하는 함수
        this.currentState.send(data)
    }
}
