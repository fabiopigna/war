import { GVector } from '../../../shapes/GVector';
export class MoveConfig {
    public defaultSpeed: GVector = new GVector(1.5,1.5);
    public rotationSpeed: number = 0.2;
    public rotationTollerance: number = 0.2;
    public tollerance: number = 2 * 0.25;
}