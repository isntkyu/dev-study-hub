// 전략 패턴의 config 이어서 예제
import { ConfigTemplate } from './configTemplate.js'

export class JsonConfig extends ConfigTemplate {
    _deserialize(data) {
        return JSON.parse(data)
    }

    _serialize(data) {
        return JSON.stringify(data)
    }
}