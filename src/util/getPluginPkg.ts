let unknownNameNumber = 0
export default function getPluginPkg(plugin: any) {
  const {plugin: {pkg = null} = {}} = plugin
  if(pkg){
    return pkg
  }
  const {plugin: {name = null, version = null} = {}} = plugin
  if(name && version){
    return {name, version}
  }
  const {pkg: _pkg} = plugin
  if(_pkg){
    return _pkg
  }
  const {name: _name, version: _version} = plugin
  if(_name && _version){
    return {name: _name, version: _version}
  }
  unknownNameNumber += 1
  return {
    name: `unknown${unknownNameNumber}`,
    version: '0.0.0',
  }
}
