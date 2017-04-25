import { GBounds } from './GBounds';
import { GVector } from './GVector';
export class GPoint {
    public x: number;
    public y: number;

    public static from(point: { x: number, y: number }): GPoint {
        return new GPoint(point.x, point.y);
    }

    public static fromRandom(bounds: GBounds): GPoint {
        return new GPoint(bounds.x + Math.random() * bounds.width, bounds.y + Math.random() * bounds.height);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public sub(point: GPoint): GVector {
        return new GVector(this.x - point.x, this.y - point.y);
    }

    public plus(vector: GVector): GPoint {
        return new GPoint(this.x + vector.dx, this.y + vector.dy);
    }

    public mul(point: GPoint): GPoint {
        return new GPoint(this.x * point.x, this.y * point.y);
    }

    public isClose(otherPoint: GPoint, tollerance: number): boolean {
        return this.sub(otherPoint).abs().lessThan(tollerance);

    }
}

