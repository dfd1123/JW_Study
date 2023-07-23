// O(루트 n) 으로 소수 판별 하는 방법
function isPrime(num) {
    for(let i = 2; i * i <= num; i++){
        if(num % i === 0) return false;
    }

    return true;
}

// 에라토스테네스가 발견한 소수를 찾는 방법 O(n log log n)
function getPrimes(num) {
    const prime = [false, false, ...Array(num - 1).fill(true)];

    for(let i = 2; i * i <= num; i++){
        if(prime[i]){
            for(let j = i * 2; j <= num; j += i){
                prime[j] = false;
            }
        }
    }

    return prime.filter(Boolean);
}