import { ITargetCommand, ITarget } from "interfaces";
import * as thunder from "dreamcheeky-thunder-lib";
import * as Promise from "bluebird";

function executeCommand(name: string, time: number): Promise<any> {
  const promiseCommand = Promise.method(() => thunder[name]());
  return promiseCommand({})
    .then(() => Promise.delay(time))
    .then(thunder.stop);
}

function resetHorizontal() {
  return executeCommand("left", 9000)
    .then(() => executeCommand("right", 3100));
}

function resetVertical() {
  return executeCommand("up", 2000)
    .then(() => executeCommand("down", 775));
}

function resetPosition() {
  resetVertical().then(resetHorizontal);
}

function chainCommands(commands: ITargetCommand[]) {
  const chain = commands.map((command: ITargetCommand) => {
    const cmd: string = Object.keys(command)[0];
    let time = 0;

    if(typeof command[cmd] === 'boolean') {
      time = 3020;
    } else {
      time = command[cmd];
    }

    return executeCommand.bind(null, cmd, time);
  });

  return Promise.mapSeries(chain, (cmd) => cmd())
    .then(() => Promise.delay(1000))
    .then(resetPosition);
}

export {
  executeCommand,
  resetHorizontal,
  resetVertical,
  resetPosition,
  chainCommands
}
