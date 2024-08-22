import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SvgService } from '../svg.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;
  skinColors: string[] = ['#FFD700', '#FFB6C1', '#8B4513', '#D2B48C', '#FFF5EE'];

  faceSvgPaths = [
    'Face-1.svg',
    'Face-2.svg',
    'Face-3.svg',
    // Add more paths as needed
  ];

  constructor(private svgService: SvgService) { }

  async ngOnInit() {
    try {
      const bodySvg = await this.svgService.loadSvg('body.svg');
      const leftHandSvg = await this.svgService.loadSvg('left-hand.svg');
      const rightHandSvg = await this.svgService.loadSvg('hands/right-hand-3.svg');
      const legsSvg = await this.svgService.loadSvg('legs.svg');
  
      for (const facePath of this.faceSvgPaths) {
        const faceSvg = await this.svgService.loadSvg(facePath);
        const combinedSvg = this.combineAndDisplaySvgs(faceSvg, bodySvg, leftHandSvg, rightHandSvg, legsSvg);
        if (combinedSvg) {
          // this.changeSkinColor(combinedSvg, '#773E2A'); // Example color
        } else {
          console.error('Error combining SVGs: combinedSvg is null');
        }            }
    } catch (error) {
      console.error('Error loading SVGs:', error);
    }
    
  }

  combineAndDisplaySvgs(faceSvg: string, bodySvg: string, leftHandSvg: string, rightHandSvg: string, legsSvg: string) {
    const svgContainer = document.getElementById('svg-container');
    if (svgContainer) {
      const svgContent = `
        <svg width="400" height="1000" xmlns="http://www.w3.org/2000/svg">
          <g id="face" transform="translate(152, 0)">
            ${faceSvg}
          </g>
          <g id="body" transform="translate(200, 175)">
            ${bodySvg}
          </g>
           <g id="legs" transform="translate(190, 320)">
            ${legsSvg}
          </g>
          <g id="left-hand" transform="translate(255, 187)">
            ${leftHandSvg}
          </g>
          <g id="right-hand" transform="translate(30, 178)">
            ${rightHandSvg}
          </g>
         
        </svg>
      `;
  
      const svgElement = document.createElement('div');
      svgElement.innerHTML = svgContent;
      svgContainer.appendChild(svgElement);

      return svgElement;
    }
    return null;
  }

  
  insertSvg(groupId: string, svgContent: string, x: number, y: number) {
    const groupElement = document.getElementById(groupId);
    if (groupElement) {
      groupElement.innerHTML = svgContent;
      groupElement.setAttribute('transform', `translate(${x}, ${y})`);
    }
    const canvas = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      this.context = context;
    } else {
      console.error('Unable to get canvas context');
    }
  }

  ngAfterViewInit(): void {
   
  }

  changeSkinColor(svgElement: HTMLDivElement, color: string) {
    const skinElements = svgElement.querySelectorAll('.skin');
    skinElements.forEach(element => {
      (element as SVGElement).setAttribute('fill', color);
    });
  }

  onColorChange(color: string) {
    const svgContainer = document.getElementById('svg-container');
    if (svgContainer) {
      const svgElements = svgContainer.querySelectorAll('div');
      svgElements.forEach(svgElement => {
        this.changeSkinColor(svgElement as HTMLDivElement, color);
      });
    }
  }
}
