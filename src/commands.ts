import { ITargetCommand, ITarget } from 'interfaces';

const thunder = require("dreamcheeky-thunder-lib");
const Promise = require("bluebird");

function executeCommand(name: string, time: number) {
  const promiseCommand = Promise.method(() => thunder[name]());
  return promiseCommand()
    .then(() => Promise.delay(time))
    .then(thunder.stop);
}

function resetHorizontal() {
  return executeCommand("left", 9000).then(() => executeCommand("right", 3100));
}

function resetVertical() {
  return executeCommand("up", 2000).then(() => executeCommand("down", 775));
}

function resetPosition() {
  resetVertical().then(resetHorizontal);
}


// {
//   name: "Chris",
//   id: "1",
//   commands: [{ up: 10 }, { down: 20 }, { fire: 1 }]
// },

function chainCommands(commands: ITargetCommand[]) {
  const chain = commands.map((command: ITargetCommand) => {
    const cmd: string = Object.keys(command)[0];
    const time: number = command[cmd];
    
    return executeCommand.bind(null, cmd, time);
  });

  return Promise.mapSeries(chain, (cmd) => cmd());
}

chainCommands([{ up: 2000 }, { down: 1000 }, { fire: 1 }])

// resetPosition();