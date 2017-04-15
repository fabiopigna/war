import { GPoint } from './GPoint';
import { GVector } from './GVector';
export class GAngle {

    private angle: number;

    constructor(angle: number) {
        this.angle = angle;
    }

    public static from(p0: GPoint, p1: GPoint): GAngle {
        return new GAngle(Math.atan2(p1.y - p0.y, p1.x - p0.x));
    }

    public mul(vector: GVector): GVector {
        return new GVector(Math.cos(this.angle) * vector.dx, Math.sin(this.angle) * vector.dy);
    }
}
