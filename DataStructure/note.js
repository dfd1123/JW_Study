function solution(n) {
    const decimal = n.toString(3).split('').reverse().join('');
    return parseInt(decimal, 3);
}

console.log(solution(45));