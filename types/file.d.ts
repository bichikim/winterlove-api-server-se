// declare file extension should be here

declare module '*.json' {
  const value: {[name: string]: any}
  export default value
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.graphql' {
  const graphql: any
  export default graphql
}
