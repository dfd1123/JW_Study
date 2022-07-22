type Flatten<T> = T extends any[] ? T[number] : T extends object ? T[keyof T] : T;


const numbers = [1, 2, 3];
type NumbersArrayFlattened = Flatten<typeof numbers>; 
// 1. number[] 
// 2. number

const person = {
    name: 'Mark',
    age: 38,
};

type SomeObjectFlattened = Flatten<typeof person>;
// 1. keyof T --> 'id' | 'name'
// 2. T['id' | 'name'] --> T['id'] | T['name'] --> number | string

const isMale = true;
type SomeBooleanFlattened = Flatten<typeof isMale>;
// true