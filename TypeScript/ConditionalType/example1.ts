interface StringContainer {
    value: string;
    format(): string;
    split(): string[];
}

interface NumberContainer {
    value: number;
    nearestPrime: number;
    round(): number;
}

type Item1<T> = {
    id: T;
    container: any;
}

const item1: Item1<string> = {
    id: 'aaaaa',
    container: null,
}
 


// ---->



type Item2<T> = {
    id: T;
    container: T extends string ? StringContainer : NumberContainer;
}

const item2: Item2<string> ={
    id: 'aaaaa',
    container: null, // Type 'null' is not assignable to type 'StringContainer'
}


const item21: Item2<string> ={
    id: 'aaaaa',
    container: {
        value: '',
        format: () => 'adwaw',
        split: () => ['adwaw'],
    }, // correct
}



// ----->

type Item3<T> = {
    id: T extends string | number ? T : never;
    container: T extends string ? StringContainer : T extends number ? NumberContainer : never;
}

const item3: Item3<boolean> = {
    id: true, // Type 'boolean' is not assignable to type 'never'
    container: null // Type 'null' is not assignable to type 'never'
}

const item31: Item3<string> = {
    id: '2',
    container: {
        value: '',
        format: () => 'adwaw',
        split: () => ['adwaw'],
    }, // correct
}