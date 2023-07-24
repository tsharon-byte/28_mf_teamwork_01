export interface ICheck {
  regexp: RegExp
  logicalNot: boolean
}

export type IChecks = ICheck[]
