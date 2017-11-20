"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.targets = [
    {
        name: "Chris",
        id: "1",
        commands: [{ up: 1000 }, { up: 250 }]
    },
    {
        name: "Matt",
        id: "2",
        commands: [{ up: 250 }, { right: 3500 }]
    },
    {
        name: "Juan",
        id: "3",
        commands: [{ up: 250 }, { left: 2200 }]
    },
    {
        name: "Tyler",
        id: "4",
        commands: [{ up: 250 }, { left: 3500 }]
    },
    {
        name: "Kevin",
        id: "5",
        commands: [{ up: 250 }, { right: 1850 }]
    }
];
exports.userInterface = ["name", "id", "commands"];
exports.commandInterface = ["up", "down", "right", "left", "fire"];
//# sourceMappingURL=state.js.map