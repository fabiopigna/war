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
    public plus(point: GPoint): GPoint {
        return new GPoint(this.x + point.x, this.y + point.y);
    }

    public mul(point: GPoint): GPoint {
        return new GPoint(this.x * point.x, this.y * point.y);
    }
}
export class GSize {

    public width: number;
    public height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export interface IBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class GBounds implements IBounds {
    public x: number;
    public y: number;
    public width: number = 0;
    public height: number = 0;

    public static from(x: number, y: number, width: number, height: number): GBounds {
        const bounds = new GBounds();
        bounds.x = x;
        bounds.y = y;
        bounds.width = width;
        bounds.height = height;
        return bounds;
    }

    public static fromPS(point: GPoint, size: GSize): GBounds {
        const bounds = new GBounds();
        bounds.x = point.x;
        bounds.y = point.y;
        bounds.width = size.width;
        bounds.height = size.height;
        return bounds;
    }
    public static fromCenter(center: GPoint, radius: number): GBounds {
        const bounds = new GBounds();
        bounds.x = center.x - radius;
        bounds.y = center.y - radius;
        bounds.width = 2 * radius;
        bounds.height = bounds.width;
        return bounds;
    }

    public static fromJSON(json: { x: number, y: number, width: number, height: number }): GBounds {
        return GBounds.from(json.x, json.y, json.width, json.height);
    }

    public static fromPoints(p0: GPoint, p1: GPoint): GBounds {
        return GBounds.from(Math.min(p0.x, p1.x), Math.min(p0.y, p1.y), Math.abs(p1.x - p0.x), Math.abs(p1.y - p0.y));
    }

    public keepInside(limit: GBounds): GBounds {
        this.x = this.x > limit.x ? this.x : limit.x;
        this.x = this.x + this.width < limit.right ? this.x : limit.right - this.width;
        this.y = this.y > limit.y ? this.y : limit.y;
        this.y = this.y + this.height < limit.bottom ? this.y : limit.bottom - this.height;
        return this;
    }

    public moveByCopy(moveBy: GPoint): GBounds {
        return GBounds.from(this.x + moveBy.x, this.y + moveBy.y, this.width, this.height);
    }

    public isInside(limit: GBounds): boolean {
        return this.x > limit.x && (this.x + this.width < limit.right) && (this.y > limit.y) && (this.y + this.height < limit.bottom);
    }

    get center(): GPoint {
        return new GPoint(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
    }

    get right(): number {
        return this.x + this.width;
    }

    get left(): number {
        return this.x;
    }

    get top(): number {
        return this.y;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    get topLeft(): GPoint {
        return new GPoint(this.left, this.top);
    }
}