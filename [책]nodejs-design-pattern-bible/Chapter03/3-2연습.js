import { EventEmitter } from "events";

// 3,1
function findRegex(files, regex) {
  const eventEmitter = new EventEmitter();
  process.nextTick(() => eventEmitter.emit("start"));
  for (const file of files) {
  }
}

// 3.2,3,4
function ticker(number, cb) {
  const eventEmitter = new EventEmitter();
  const now = Date.now();

  process.nextTick(() => {
    eventEmitter.emit("begin");
    if (now % 5 === 0) {
      eventEmitter.emit("error");
    }
  });

  let timer;
  var tick = () => {
    eventEmitter.emit("tick");
    timer = setTimeout(tick, 50);
  };
  tick();
  setTimeout(() => {
    clearTimeout(timer);
  }, number);

  return eventEmitter;
}
