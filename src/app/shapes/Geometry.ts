export class GPoint {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public sub(point: GPoint): GPoint {
        return new GPoint(this.x - point.x, this.y - point.y);
    }

    public mul(point: GPoint): GPoint {
        return new GPoint(this.x * point.x, this.y * point.y);
    }
}