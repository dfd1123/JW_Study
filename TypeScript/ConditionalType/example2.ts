type ArrayFilter<T> = T extends any[] ? T : never;

type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>;


// string | number | string[] | number[] 타입이
// ArrayFilter type alias 로 인해
// never | never | string[] | number[] 가 되고
// never가 사라지므로 촤종적으로 
// string[] | number[] 가 된다.