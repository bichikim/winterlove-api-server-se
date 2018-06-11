import {camelCase, upperFirst} from 'lodash'

export const name = (fileName: string) => {
  return camelCase(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''),
  )
}

export const upperName = (fileName: string) => {
  return upperFirst(name(fileName))
}
