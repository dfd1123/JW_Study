function shuffle(value: string) : string;
function shuffle<T>(value: T[]) : T[];
function shuffle(value: string | any[]) : string | any[] { // 구현부
    let result : unknown;
    if(typeof value === 'string'){
        result = value.split('').sort(() => Math.random() - 0.5).join('');
    }else{
        result = value.sort(() => Math.random() - 0.5);
    }

    console.log(result as typeof value);

    return result as typeof value;
}

shuffle('Hello Mark');
shuffle(['123', '12']);