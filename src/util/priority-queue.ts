export class PriorityQueue<T> {
    data: [number, T][] = []

    constructor() {
        this.data = []
    }

    public insert(priority: number, item: T): void {
        if (this.data.length === 0) {
            this.data.push([priority, item]);
            return;
        }
    
        for (let index = 0; index < this.data.length; index++) {
            if (priority > this.data[index][0]) {
                this.data.splice(index, 0, [priority, item]);
                return;
            }
        }
    
        // If the new item has the lowest priority, add it to the end.
        this.data.push([priority, item]);
    }

    public isEmpty(): boolean {
        return this.data.length === 0;
    }

    public peek(): T | null {
        return this.data.length === 0 ? null : this.data[0][1];
    }

    public pop(): [number, T] | null {
        if(this.data.length === 0) return null;

        const element = this.data.pop();

        if(element) {
            return element;
        }

        return null;
    }
}
