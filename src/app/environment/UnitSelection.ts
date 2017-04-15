import { Container, interaction } from 'pixi.js';
import { IInteractiveUnit } from "app/units/IInteractiveUnit";
export class UnitSelection {
    private currentSelection: Map<string, IInteractiveUnit> = new Map<string, IInteractiveUnit>();

    public setSelected(unit: IInteractiveUnit): void {
        if (this.currentSelection.has(unit.id)) {
            this.currentSelection.delete(unit.id);
        } else {
            this.currentSelection.clear();
            this.currentSelection.set(unit.id, unit);
        }
    }

    public getSelection(): IInteractiveUnit[] {
        return Array.from(this.currentSelection.values());
    }

    public onClick(event: interaction.InteractionEvent): void {
        this.getSelection().takeFirst(unit => unit.handleClickOnWorld(event));
    }

}