class Node {
    value;
    children;

    constructor(value = ''){
        this.value = value;
        this.children = new Map();
    }
}

class Trie {
    root;

    constructor(){
        this.root = new Node();
    }

    push(string){
        let currentNode = this.root;

        for(const char of string){
            if(!currentNode.children.has(char)){
                currentNode.children.set(char, new Node(`${currentNode.value}${char}`));
            }

            currentNode = currentNode.children.get(char);
        }
    }

    has(string){
        let currentNode = this.root;

        for(const char of string){
            if(!currentNode.children.has(char)) return false;

            currentNode = currentNode.children.get(char);
        }

        return true;
    }
}