import { NewQuadTree } from './NewQuadTree';
import { GBounds, GSize } from './shapes/Geometry';
import { Unit } from './units/Unit';
import { TextureLibrary } from './graphics/TextureLibrary';
import { Army } from './units/army/Army';
import { Environment } from './Environment';
import { RectangleShape } from './shapes/RectangleShape';

import { autoDetectRenderer } from 'pixi.js';
import { SystemRenderer, Container, Graphics, Application, Point, particles, Sprite, Texture, extras, loaders } from 'pixi.js';
import { Component, ElementRef, OnInit } from '@angular/core';
import * as Quadtree from 'quadtree-lib';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public fps: string;

  public width: number = 1024
  public height: number = 400;
  public app: Application;
  public stage: Container;

  public redArmy: Army;
  public map: Map<string, Unit>;
  public env: Environment;
  public textureLibrary: TextureLibrary;
  constructor(private elementRef: ElementRef) {
    this.textureLibrary = new TextureLibrary();
  }


  ngOnInit(): void {
    this.app = new Application(this.width, this.height, { antialias: true });
    this.map = new Map<string, Unit>();


    this.stage = this.app.stage;
    this.app.renderer.backgroundColor = 0xaaaaaa;

    this.elementRef.nativeElement.appendChild(this.app.view);
    this.textureLibrary.load().onComplete.add(() => {
      this.env = new Environment(this.map, this.textureLibrary);
      this.env.worldBounds = GBounds.from(0, 0, this.width, this.height);
      this.env.stage = this.stage;
      // this.env.quadTree = new Quadtree<Unit>({ width: this.width, height: this.height });
      this.redArmy = new Army(this.env);
      this.redArmy.createSoldiers(100);
      console.log(this.redArmy.soldiers)
      this.app.ticker.add((delta) => this.gameLoop(delta));
    });
  }




  public gameLoop(delta: number): void {
    this.fps = this.app.ticker.FPS.toFixed(0);
    this.env.quadTree = new NewQuadTree<Unit>({ x: 0, y: 0, width: this.width, height: this.height }, 10);
    this.env.quadTree.insert(Array.from<Unit>(this.map.values()).filter(unit => unit.canBeHit));
    this.map.forEach((unit: Unit) => {
      unit.updateLogic(delta);
    })
  }
}
