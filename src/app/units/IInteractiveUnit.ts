import { interaction } from "pixi.js";

export interface IInteractiveUnit {

    id: string;
    handleClickOnWorld(event: interaction.InteractionEvent);
}