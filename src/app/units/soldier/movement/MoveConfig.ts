import { GVector } from '../../../shapes/GVector';
export class MoveConfig {
    public defaultSpeed: GVector = new GVector(0.25, 0.25);
    public tollerance: number = 2 * 0.25;
}