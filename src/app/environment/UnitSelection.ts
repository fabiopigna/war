import { Unit } from '../units/Unit';
export class UnitSelection {

    private currentSelection: Map<string, Unit> = new Map<string, Unit>();

    public setSelected(unit: Unit): void {
        if (this.currentSelection.has(unit.id)) {
            this.currentSelection.delete(unit.id);
        } else {
            this.currentSelection.set(unit.id, unit);
        }
    }

    public getSelection(): Unit[] {
        return Array.from(this.currentSelection.values());
    }

}