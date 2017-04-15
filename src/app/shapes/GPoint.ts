import { GVector } from './GVector';
export class GPoint {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static from(point: { x: number, y: number }): GPoint {
        return new GPoint(point.x, point.y);
    }

    public sub(point: GPoint): GVector {
        return new GVector(this.x - point.x, this.y - point.y);
    }

    public plus(point: GPoint): GPoint {
        return new GPoint(this.x + point.x, this.y + point.y);
    }

    public mul(point: GPoint): GPoint {
        return new GPoint(this.x * point.x, this.y * point.y);
    }

    public isClose(otherPoint: GPoint, tollerance: number): boolean {
        return this.sub(otherPoint).abs().lessThan(tollerance);

    }
}

