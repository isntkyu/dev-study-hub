import zmq from 'zmq';
import delay from 'delay';
import {generateTask} from "./generateTask";

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const BATCH_SIZE = 10000

const [, , maxLength, searchHash] = process.argv

async function main () {
    const ventilator =  new zmq.Push()
    await ventilator.bind('tcp://*:5016')
    await delay(1000)
    const generatorObj = generateTask(searchHash, ALPHABET, maxLength, BATCH_SIZE);
    for (const task of generatorObj) {
        await ventilator.send(JSON.stringify(task))
    }
}

main().catch(err => console.error(err))