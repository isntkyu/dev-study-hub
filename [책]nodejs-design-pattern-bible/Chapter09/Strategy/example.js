import ini from 'ini'
import { Config } from './config.js'

export const iniStrategy = {
    deserialize: data => ini.parse(data),
    serialize: data => ini.stringify(data)
}

export const jsonStrategy = {
    deserialize: data => JSON.parse(data),
    serialize: data => JSON.stringify(data)
}

async function main() {
    const iniConfig  = new Config(iniStrategy)
    await iniConfig.load('sample/conf.ini')
    iniConfig.set('book.nodejs', 'design patterns')
    await iniConfig.save('samples/conf_mod.ini')

    const jsonConfig = new Config(jsonStrategy)
    await jsonConfig.load('samples/conf.json')
    jsonConfig.set('book.nodejs', 'design patterns')
    await jsonConfig.save('samples/conf_mod.json')
}

main()