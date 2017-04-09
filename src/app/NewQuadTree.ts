import { GBounds, IBounds } from './shapes/Geometry';
export class NewQuadTree<T extends IBounds> {

    public maxObjects = 10;
    public bounds: IBounds;
    public objects: T[] = [];
    public nodes: NewQuadTree<T>[] = [];
    public level = 0;
    public maxLevels = 5;

    constructor(boundBox: IBounds, lvl: number) {
        this.bounds = boundBox || GBounds.from(0, 0, 0, 0)
        this.level = lvl || 0;
    }

    public clear() {
        this.objects = [];
        this.nodes.forEach(node => node.clear());
        this.nodes = [];
    }

    public checkCollision(b0: IBounds, b1: IBounds): boolean {
        return b1.x < b0.x + b0.width &&
            b1.x + b1.width > b0.x &&
            b1.y < b0.y + b0.height &&
            b1.y + b1.height > b0.y;
    }

    public colliding(bounds: IBounds): T[] {
        return this.getAllObjects([]).filter(object => this.checkCollision(bounds, object));
    }

    public detectCollision(): T[] {
        let collision: T[] = [];
        this.getAllObjects([]).forEach(first => {
            this.findObjects([], first).forEach(second => {
                if (this.checkCollision(first, second)) {
                    collision.push(first);
                    collision.push(second)
                }
            });
        });
        return collision;
    }

	/*
	 * Get all objects in the quadTree
	 */
    public getAllObjects(returnedObjects: T[]): T[] {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].getAllObjects(returnedObjects);
        }

        for (let i = 0, len = this.objects.length; i < len; i++) {
            returnedObjects.push(this.objects[i]);
        }

        return returnedObjects;
    }

    /*
     * Return all objects that the object could collide with
     */
    public findObjects(returnedObjects: T[], obj: T): T[] {
        if (typeof obj === 'undefined') {
            console.log('UNDEFINED OBJECT');
            return;
        }

        let index = this.getIndex(obj);
        if (index != -1 && this.nodes.length) {
            this.nodes[index].findObjects(returnedObjects, obj);
        }

        for (let i = 0, len = this.objects.length; i < len; i++) {
            returnedObjects.push(this.objects[i]);
        }

        return returnedObjects;
    };

    /*
     * Insert the object into the quadTree. If the tree
     * excedes the capacity, it will split and add all
     * objects to their corresponding nodes.
     */
    public insert(obj: T | T[]): void {
        if (typeof obj === 'undefined') {
            return;
        }
        if (obj instanceof Array) {
            obj.forEach(object => this.insert(object));
            return;
        }
        if (this.nodes.length) {
            let index = this.getIndex(obj);
            if (index != -1) {
                this.nodes[index].insert(obj);
                return;
            }
        }

        this.objects.push(obj);

        // Prevent infinite splitting
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            if (this.nodes[0] == null) {
                this.split();
            }

            let i = 0;
            while (i < this.objects.length) {
                let index = this.getIndex(this.objects[i]);
                if (index != -1) {
                    this.nodes[index].insert((this.objects.splice(i, 1))[0]);
                } else {
                    i++;
                }
            }
        }
    };

    /*
     * Determine which node the object belongs to. -1 means
     * object cannot completely fit within a node and is part
     * of the current node
     */
    public getIndex(obj: T): number {

        let index = -1;
        let verticalMidpoint: number = this.bounds.x + this.bounds.width / 2;
        let horizontalMidpoint: number = this.bounds.y + this.bounds.height / 2;

        // Object can fit completely within the top quadrant
        let topQuadrant: boolean = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
        // Object can fit completely within the bottom quandrant
        let bottomQuadrant: boolean = (obj.y > horizontalMidpoint);

        // Object can fit completely within the left quadrants
        if (obj.x < verticalMidpoint &&
            obj.x + obj.width < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            }
            else if (bottomQuadrant) {
                index = 2;
            }
        }
        // Object can fix completely within the right quandrants
        else if (obj.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            }
            else if (bottomQuadrant) {
                index = 3;
            }
        }

        return index;
    };

    /*
     * Splits the node into 4 subnodes
     */
    public split(): void {
        // Bitwise or [html5rocks]
        let subWidth = (this.bounds.width / 2) | 0;
        let subHeight = (this.bounds.height / 2) | 0;

        this.nodes[0] = new NewQuadTree<T>(GBounds.fromJSON({
            x: this.bounds.x + subWidth,
            y: this.bounds.y,
            width: subWidth,
            height: subHeight
        }), this.level + 1);
        this.nodes[1] = new NewQuadTree<T>(GBounds.fromJSON({
            x: this.bounds.x,
            y: this.bounds.y,
            width: subWidth,
            height: subHeight
        }), this.level + 1);
        this.nodes[2] = new NewQuadTree<T>(GBounds.fromJSON({
            x: this.bounds.x,
            y: this.bounds.y + subHeight,
            width: subWidth,
            height: subHeight
        }), this.level + 1);
        this.nodes[3] = new NewQuadTree<T>(GBounds.fromJSON({
            x: this.bounds.x + subWidth,
            y: this.bounds.y + subHeight,
            width: subWidth,
            height: subHeight
        }), this.level + 1);
    };
}

