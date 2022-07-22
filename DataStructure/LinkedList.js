class Node {
    prev = null;
    next = null;

    constructor(value) {
        this.value = value;
    }
}

class LinkedList {
    constructor(doubly = false) {
        this._doubly = doubly;
        this.head = null;
        this.length = 0;
    }

    addFirst(newValue) {
        const node = new Node(newValue);

        if (this._doubly) node.prev = null;

        this.next = this.head;

        this.head = node;
        this.length++;
    }

    addLast(newValue) {
        if (!this.length) {
            this.addFirst();
        } else {
            const node = new Node(newValue);
            let current = this.head;

            while (current.next) {
                current = current.next;
            }

            if (this._doubly) node.prev = current;

            current.next = node;
            this.length++;
        }
    }

    add(newValue, index) {
        if (!this.length) this.addFirst(newValue);
        else {
            const node = new Node(newValue);

            let cnt = 0;
            let nextNode = this.head;
            let prevNode = null;

            while (nextNode.next && index !== cnt) {
                prevNode = nextNode;
                nextNode = nextNode.next;
                cnt++;
            }

            prevNode.next = node;
            node.next = nextNode;

            if (this._doubly) {
                nextNode.prev = node;
                node.prev = prevNode;
            }

            this.length++;
        }
    }

    remove(index) {
        let cnt = 0;
        let currentNode = this.head;
        let prevNode = null;


        while (index !== cnt) {
            prevNode = currentNode;
            currentNode = currentNode.next;

            cnt++
        }

        const nextNode = currentNode.next;

        if(index === 0) this.head = nextNode;

        if (prevNode) prevNode.next = nextNode;
        else this.head = null;

        if(this._doubly){
            nextNode.prev = prevNode;
        }

        this.length--;
    }

    clear(){
        this.head = null;
        this.length = 0;
    }

    peek(index){
        let cnt = 0;
        let current = this.head;

        if(index > this.length / 2 && this._doubly) {
            cnt = this.length - 1;
            while (index !== cnt) {
                current = current.prev;
                cnt--;
            }
        }else{
            while (index !== cnt) {
                current = current.next;
                cnt++;
            }
        }

        return current;
    }

    print(){
        let current = this.head;
        const arr = [];

        while (current) {
            arr.push(current.value);
            current = current.next;
        }

        console.log(arr.join(`${this._doubly ? ' <-> ' : ' -> '}`));
    }
}