const array = [1, 1, 15, 124, 400, 599, 1004, 2876, 8712];

function binarySearch(array, findValue){
    let left = 0;
    let right = array.length - 1;
    let middle = Math.floor((left + right) / 2);
    let cnt = 0;

    while(left <= right){
        const value = array[middle];

        if(value == findValue) return middle;
        
        if(value < findValue){
            left = middle + 1;
        } else {
            right = middle - 1;
        }

        middle = Math.floor((left + right) / 2);
    }

    return -1;
}

console.log(binarySearch(array, 1));