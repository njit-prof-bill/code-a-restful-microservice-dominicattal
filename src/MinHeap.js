class MinHeap {
    constructor() {
        this.buffer = [];
    }

    empty() {
        return this.buffer.length == 0;
    }

    swap(i, j) {
        const temp = this.buffer[i];
        this.buffer[i] = this.buffer[j];
        this.buffer[j] = temp;
    }

    push(val) {
        this.buffer.push(val);
        let idx = this.buffer.length - 1;
        const getParentIdx = (idx) => { return Math.floor((idx - 1) / 2) };
        const hasParent = (idx) => { return getParentIdx(idx) >= 0 };
        while (hasParent(idx) && this.buffer[idx] < this.buffer[getParentIdx(idx)]) {
            this.swap(idx, getParentIdx(idx));
            idx = getParentIdx(idx);
        }
    }

    pop() {
        if (this.buffer.length == 0)
            return null;

        const item = this.buffer[0];
        this.buffer[0] = this.buffer[this.buffer.length - 1];
        this.buffer.pop();

        const getLeftChildIdx = (idx) => { return 2 * idx + 1 };
        const getRightChildIdx = (idx) => { return 2 * idx + 2 };
        const hasLeftChild = (idx) => { return getLeftChildIdx(idx) < this.buffer.length };
        const hasRightChild = (idx) => { return getRightChildIdx(idx) < this.buffer.length };

        let idx = 0;
        while (hasLeftChild(idx)) {
            let minChildIdx = getLeftChildIdx(idx);
            if (hasRightChild(idx) && this.buffer[getRightChildIdx(idx)] < this.buffer[minChildIdx])
                minChildIdx = getRightChildIdx(idx);
            if (this.buffer[idx] < this.buffer[minChildIdx])
                break;
            this.swap(idx, minChildIdx);
            idx = minChildIdx;
        }

        return item;
    }
}

module.exports = MinHeap;