import { RectangleShape } from './shapes/RectangleShape';

import { autoDetectRenderer } from 'pixi.js';
import { SystemRenderer, Container, Graphics, Application, Point, particles } from 'pixi.js';
import { Component, ElementRef, OnInit } from '@angular/core';


declare let Stats: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  public width: number = 1024
  public height: number = 400;
  // public app: Application;
  public renderer: SystemRenderer
  public stage: Container;

  private stats: any;
  constructor(private elementRef: ElementRef) {
    this.stats = new Stats();
    this.stats.setMode(0); // 0: fps, 1: ms 

    // Align top-left 
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';

    document.body.appendChild(this.stats.domElement);


  }


  ngOnInit(): void {
    // this.app = new Application(this.width, this.height, { antialias: true });


    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { antialias: true });
    console.log(this.renderer )
    this.stage = new Container();


    this.elementRef.nativeElement.appendChild(this.renderer.view);
    // this.app.ticker.autoStart = false;

    let rects: RectangleShape[] = [];
    for (let i = 0; i < 100; i++) {
      let rect: RectangleShape = new RectangleShape(this.stage);
      rect.setPosition(Math.random() * this.width, Math.random() * this.height);
      rects.push(rect);
    }
    rects.forEach(rect => {
      let copy = rects.slice();
      copy.splice(copy.indexOf(rect), 1)
      rect.setFriends(copy);
    });


    requestAnimationFrame(() => this.update());

    // this.startUpdate();
    // this.stats.end();

  }


  public startUpdate() {
    requestAnimationFrame(() => this.update());
  }

  public update() {
    this.stats.begin();
    this.renderer.render(this.stage);
    this.startUpdate();
    this.stats.end();
  }
}
