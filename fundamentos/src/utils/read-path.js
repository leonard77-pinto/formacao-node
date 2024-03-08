export function readPath(path){

    const routeParametersRegex = /:([a-zA-Z]+)/g
    const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
  
    //const pathRegex = new RegExp(`^${paramsWithParams}`)
    const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)
    return pathRegex
}

export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => {
      const [key, value] = param.split('=')
  
      queryParams[key] = value
  
      return queryParams
    }, {})
  }