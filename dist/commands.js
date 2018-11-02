"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thunder = require("dreamcheeky-thunder-lib");
var Promise = require("bluebird");

function executeCommand(name, time) {
    var promiseCommand = Promise.method(function () { 
        return thunder[name](); 
    });

    return promiseCommand({})
        .then(function () { return Promise.delay(time); })
        .then(thunder.stop);
}

exports.executeCommand = executeCommand;
function resetHorizontal() {
    return executeCommand("left", 9000).then(function () { return executeCommand("right", 3100); });
}

exports.resetHorizontal = resetHorizontal;
function resetVertical() {
    return executeCommand("up", 2000)
        .then(function () {
             return executeCommand("down", 775); 
        });
}

exports.resetVertical = resetVertical;
function resetPosition() {
    resetVertical().then(resetHorizontal);
}

exports.resetPosition = resetPosition;
function chainCommands(commands) {
    var chain = commands.map(function (command) {
        var cmd = Object.keys(command)[0];
        var time = 0;

        if (cmd === 'fire') {
            time = 3020;
        }
        else {
            time = command[cmd];
        }

        return executeCommand.bind(null, cmd, time);
    });
    
    return Promise.mapSeries(chain, function (cmd) { return cmd(); })
        .then(function () { return Promise.delay(1000); })
        .then(resetPosition);
}

exports.chainCommands = chainCommands;
//# sourceMappingURL=commands.js.map