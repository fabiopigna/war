import { GPoint } from './Geometry';
import { Graphics, interaction, Point, Container } from 'pixi.js';

export class RectangleShape {

    private rectangle: Graphics;
    private data: interaction.InteractionData;
    private start: GPoint;
    private dragging: boolean;
    private friends: RectangleShape[];

    constructor(private stage: Container) {
        this.rectangle = new Graphics();
        this.rectangle.lineStyle(2, 0xFFFFFF, 1);
        this.rectangle.beginFill(0xFF0000 + Math.random() * 0x0000FF);
        this.rectangle.drawRect(0, 0, 40, 40);
        this.rectangle.endFill();
        stage.addChild(this.rectangle);


        this.rectangle.interactive = true;
        this.rectangle.buttonMode = true;
        this.rectangle
            .on('pointerdown', (e) => this.onDragStart(e))
            .on('pointerup', (e) => this.onDragEnd(e))
            .on('pointerupoutside', (e) => this.onDragEnd(e))
            .on('pointermove', (e) => this.onDragMove(e));
    }

    public setPosition(x: number, y: number): void {
        this.rectangle.x = x;
        this.rectangle.y = y;
    }

    public setFriends(friends: RectangleShape[]): void {
        this.friends = friends;
    }

    public moveBy(step: GPoint): void {
        this.rectangle.x += step.x;
        this.rectangle.y += step.y;
    }

    private onDragStart(event: interaction.InteractionEvent) {
        let newPosition: Point = event.data.getLocalPosition(this.rectangle.parent);
        this.data = event.data;
        this.start = new GPoint(newPosition.x - this.rectangle.x, newPosition.y - this.rectangle.y);
        // this.rectangle.alpha = 0.5;
        this.dragging = true;
    }

    private onDragEnd(event: interaction.InteractionEvent) {
        // this.rectangle.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    private onDragMove(event: interaction.InteractionEvent) {
        if (this.dragging) {
            let point: Point = this.data.getLocalPosition(this.rectangle.parent);
            let newPosition: GPoint = new GPoint(point.x - this.start.x, point.y - this.start.y);
            let oldPosition: GPoint = new GPoint(this.rectangle.x, this.rectangle.y);
            let step: GPoint = newPosition.sub(oldPosition);
            this.rectangle.x = newPosition.x;
            this.rectangle.y = newPosition.y;
            this.friends.forEach(friend => friend.moveBy(step));
        }
    }

}

