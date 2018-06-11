/* eslint-disable typescript/no-namespace,typescript/interface-name-prefix */
// tslint:disable: interface-name no-trading-space no-namespace

// declare global types should be here
declare namespace NodeJS {
  // noinspection JSUnusedGlobalSymbols
  export interface Process {

  }

  // noinspection JSUnusedGlobalSymbols
  export interface Global {
    __src: string
    __root: string
  }
}
