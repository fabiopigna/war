import { GPoint } from './GPoint';
import { GVector } from './GVector';
export class GAngle {

    private value: number;

    constructor(angle: number) {
        this.value = angle;
    }

    public static from(p0: GPoint, p1: GPoint): GAngle {
        return new GAngle(Math.atan2(p1.y - p0.y, p1.x - p0.x));
    }

    public mul(vector: GVector): GVector {
        return new GVector(Math.cos(this.value) * vector.dx, Math.sin(this.value) * vector.dy);
    }

    public flipFlop(angleToAdjust: GAngle): GAngle {
        if (this.value - angleToAdjust.value > Math.PI) {
            return new GAngle(angleToAdjust.value + 2 * Math.PI);
        } else if (angleToAdjust.value - this.value > Math.PI) {
            return new GAngle(angleToAdjust.value - 2 * Math.PI);
        }
        return angleToAdjust;
    }

    public rotateTo(anotherAngle: GAngle, rotationSpeed: number): void {
        this.value = anotherAngle.value * rotationSpeed + this.value * (1 - rotationSpeed);
    }

    public normalizeTo(maxValue: number): number {
        return (((this.value + Math.PI) / (2 * Math.PI)) * maxValue) % maxValue;
    }

    public isClose(anotherAngle: GAngle, tollerance: number): boolean {
        return Math.abs(this.value - anotherAngle.value) < tollerance;
    }

    public getValue(): number {
        return this.value;
    }
}
