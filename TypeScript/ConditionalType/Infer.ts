// example 1

type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
const promises = [Promise.resolve('Mark'), Promise.resolve(38)];

type Expected = UnpackPromise<typeof promises>; // string | number


// example 2

function plus1(seed: number) : number {
    return seed + 1;
}

type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type Id = MyReturnType<typeof plus1>;

function lookupEntity(id: Id) {
    // query DB for entity by ID
}

lookupEntity(plus1(10));