export interface ITarget {
  name: string;
  id: string;
  commands: ITargetCommand[]
}

export interface ITargetCommand {
  [key: string]: any;
}
