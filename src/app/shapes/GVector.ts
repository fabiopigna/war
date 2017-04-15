export class GVector {

    public dx: number;
    public dy: number;

    constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }

    public abs(): GVector {
        return new GVector(Math.abs(this.dx), Math.abs(this.dy));
    }

    public lessThan(value: number): boolean {
        return this.dx * this.dx + this.dy * this.dy < value * value;
    }

}