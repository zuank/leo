import http from './http'

export const FetchBucketList = () => http('http://leonidapi.17usoft.com/libraapi2/leonid/v2/static/bucket/list?is_name=0')
export const FetchStaticList = (data) => http.get('http://leonidapi.17usoft.com/libraapi2/leonid/v2/static/object', {params: data})
