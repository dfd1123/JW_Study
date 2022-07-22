class Heap {
    #status;
    heap = [null];

    constructor(status = 'max') {
        this.#status = status;
    }

    push(newValue) {
        this.heap.push(newValue);

        let currentIndex = this.heap.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);

        if(this.#status === 'max'){
            while (parentIndex !== 0 && newValue > this.heap[parentIndex]) {
                const temp = this.heap[parentIndex];
                this.heap[parentIndex] = newValue;
                this.heap[currentIndex] = temp;
    
                currentIndex = parentIndex;
                parentIndex = Math.floor(currentIndex / 2);
            }
        }else{
            while (parentIndex !== 0 && newValue < this.heap[parentIndex]) {
                const temp = this.heap[parentIndex];
                this.heap[parentIndex] = newValue;
                this.heap[currentIndex] = temp;
    
                currentIndex = parentIndex;
                parentIndex = Math.floor(currentIndex / 2);
            }
        }
    }

    pop() {
        let cnt = 0;
        if (this.heap.length === 2) return this.heap.pop();

        const result = this.heap[1];
        this.heap[1] = this.heap.pop();

        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;

        if (this.#status === 'max') {
            while (this.heap[currentIndex] < this.heap[leftIndex] || this.heap[currentIndex] < this.heap[rightIndex]) {
                const temp = this.heap[currentIndex];

                if (this.heap[leftIndex] < this.heap[rightIndex]) {
                    this.heap[currentIndex] = this.heap[rightIndex];
                    this.heap[rightIndex] = temp;
                    currentIndex = rightIndex;
                } else {
                    this.heap[currentIndex] = this.heap[leftIndex];
                    this.heap[leftIndex] = temp;
                    currentIndex = leftIndex;

                }

                leftIndex = currentIndex * 2;
                rightIndex = currentIndex * 2 + 1;
            }
        } else {
            while (this.heap[currentIndex] > this.heap[leftIndex] || this.heap[currentIndex] > this.heap[rightIndex]) {
                const temp = this.heap[currentIndex];

                if (this.heap[leftIndex] < this.heap[rightIndex]) {
                    this.heap[currentIndex] = this.heap[leftIndex];
                    this.heap[leftIndex] = temp;
                    currentIndex = leftIndex;
                } else {
                    this.heap[currentIndex] = this.heap[rightIndex];
                    this.heap[rightIndex] = temp;
                    currentIndex = rightIndex;
                }

                leftIndex = currentIndex * 2;
                rightIndex = currentIndex * 2 + 1;
            }
        }
        return result;
    }
}


const heap = new Heap('max');

heap.push(2);
heap.push(3);
heap.push(2);

console.log(heap.heap);