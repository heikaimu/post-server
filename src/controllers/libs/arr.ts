export const removeSame = (arr: number[] | string[]) => {
    var newArr = [];
    for(var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) newArr.push(arr[i])
    }
    return newArr;
}