class Queue {
    queue = [];
    front = 0;
    rear = 0;

    enqueue(value){
        this.queue[this.rear++] = value;
    }

    dequeue(){
        const value = this.queue[this.front];
        delete this.queue[this.front];

        this.front++;

        return value;
    }

    get(){
        return this.queue;
    }

    peek(){
        return this.queue[this.front];
    }

    size(){
        return this.rear - this.front;
    }
}


// Queue를 배열의 shift와 push를 이용해서 만들고 사용하면 shift 자체가 선형 시간이 걸리기 때문에 시간 복잡도가 O(n)이 된다. 그렇기 때문에 비효율적이다. 