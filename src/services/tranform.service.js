export class TransformService {
    static fbObjectToArray(fbData) {
        return Object.keys(fbData).map(key => {  //map return new array
            const item = fbData[key]
            item.id = key
            return item
            //console.log('item: ', item)
        })
    }
}