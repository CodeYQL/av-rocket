import { ITarget } from './interfaces';

export const targets: ITarget[] = [
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

export const userInterface = ["name", "id", "commands"];
export const commandInterface = ["up", "down", "right", "left", "fire"];
