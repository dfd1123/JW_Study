function solution(a, b) {
    return a.reduce((acc,_,index) => acc + (a[index] * b[index]), 0);
}