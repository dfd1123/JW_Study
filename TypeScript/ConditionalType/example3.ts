interface Table {
    id: string;
    chairs: string[];
}

interface Dino {
    id: number;
    legs: number;
}

interface World {
    getItem<T extends string | number>(id: T): T extends string ? Table : Dino;
}

let world: World = null as any;

const dino = world.getItem(10);
const what = world.getItem(true); // getItem은 string 혹은 number 타입만 전달인자로 받기 때문에 에러 발생!