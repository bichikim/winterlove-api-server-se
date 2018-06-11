/* eslint-disable typescript/no-namespace,typescript/interface-name-prefix */

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