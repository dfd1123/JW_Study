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

function solution(priorities, location) {
    let cnt = 0;
    const queue = new Queue();

    priorities.forEach((value, index) => {
        queue.enqueue([value, index]);
    });

    console.log(queue.queue);

    priorities.sort((a,b) => b - a);

    while(1){
        const value = queue.peek();
        if(priorities[cnt] > value[0]){
            queue.enqueue(queue.dequeue());
        }else{
            cnt += 1;
            queue.dequeue();
            if(value[1] === location) return cnt;
        }
    }
}

console.log(solution([1, 2, 1], 0));