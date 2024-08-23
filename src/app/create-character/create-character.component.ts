import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, input } from '@angular/core';
import { SvgService } from '../svg.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgOptimizerService } from '../svg-optimizer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})

export class CreateCharacterComponent implements OnChanges {
  @Input() faceSvg1: string[] = [];
  @Input() assetsColor: string[] = [];
  @Input() postureSelected: string = '';



  // @ViewChild('myCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  // private context!: CanvasRenderingContext2D;

  selectedSkinColor: string | null = null;
  selectedTopColor: string | null = null;
  selectedPantColor: string | null = null;
  sitingX: number = 0;
  sitingY: number = 0;
  selectedTab: string = 'face';

  skinColors: string[] = ['#E98C7B', '#F4BCA4', '#FFB784', '#F3A396', '#B2674B'];
  topColors: string[] = ['#78A9FF','#EF5DA8','#F3BB9D'];
  pantColors: string[] = ['#001D6C','#EF5DA8'];

  showPopup = false;
  selectedBackground = 'default-background.svg';

  backgroundOptions = [
    { image: 'backgrounds/1.svg', svg: 'backgrounds/1.svg' },
    { image: 'backgrounds/2.svg', svg: 'backgrounds/2.svg' },
    { image: 'backgrounds/3.svg', svg: 'backgrounds/3.svg' },
    { image: 'backgrounds/5.svg', svg: 'backgrounds/5.svg' },
    { image: 'backgrounds/6.svg', svg: 'backgrounds/6.svg' },
    { image: 'backgrounds/9.svg', svg: 'backgrounds/9.svg' }
  ];

  selectedFace: string | null = null;
  selectedRightHand: string | null = null;
  selectedLeftHand: string | null = null;
  selectedCharacter: string | null = null;



  faceSvgs: SafeHtml[] = [];
  rightHandSvgs: SafeHtml[] = [];
  leftHandSvgs: SafeHtml[] = [];
  backgroundSvgs: SafeHtml[] = [];
  avaFaceSvgs: SafeHtml[] = [];
  jennaFaceSvgs: SafeHtml[] = [];

  faceSvg: string = 'body.svg';
  bodySvg: string = 'body.svg';
  leftHandSvg: string = 'left-hand.svg';
  rightHandSvg: string = 'hands/Right-hand/right-hand-3.svg';
  legsSvg: string = 'legs.svg';
  backgroundSvg: string = 'backgrounds/9.svg'
  svgContainerData: boolean =false;

  faceSvgPaths = ['Face-1.svg', 'Face-2.svg', 'Face-3.svg'];
  rightHandSvgPaths = ['hands/Right-hand/right-hand-1.svg', 'hands/Right-hand/right-hand-2.svg', 'hands/Right-hand/right-hand-3.svg', 'hands/Right-hand/right-hand-4.svg'];
  leftHandSvgPaths = ['hands/Left-hand/left-hand-1.svg', 'hands/Left-hand/left-hand-2.svg', 'hands/Left-hand/left-hand-3.svg', 'hands/Left-hand/left-hand-4.svg', 'hands/Left-hand/left-hand-5.svg'];
  backgroundSvgPaths = ['backgrounds/1.svg','backgrounds/2.svg','backgrounds/3.svg','backgrounds/5.svg','backgrounds/6.svg','backgrounds/8.svg']
  avaFacePaths = ['face/female/Ava/Ava-1.svg','face/female/Ava/Ava-2.svg','face/female/Ava/Ava-3.svg','face/female/Ava/Ava-4.svg','face/female/Ava/Ava-5.svg','face/female/Ava/Ava-6.svg','face/female/Ava/Ava-7.svg'];
  jennaFacePaths = ['face/female/Jenna/Jenna-1.svg','face/female/Jenna/Jenna-2.svg','face/female/Jenna/Jenna-3.svg','face/female/Jenna/Jenna-4.svg','face/female/Jenna/Jenna-5.svg','face/female/Jenna/Jenna-6.svg','face/female/Jenna/Jenna-7.svg','face/female/Jenna/Jenna-8.svg','face/female/Jenna/Jenna-9.svg'];

  rightHandPngPaths = ['hands/Right-hand/png/right-hand-1.png', 'hands/Right-hand/png/right-hand-2.png', 'hands/Right-hand/png/right-hand-3.png', 'hands/Right-hand/png/right-hand-4.png'];
  leftHandPngPaths = ['hands/Left-hand/png/left-hand-1.png', 'hands/Left-hand/png/left-hand-2.png', 'hands/Left-hand/png/left-hand-3.png', 'hands/Left-hand/png/left-hand-4.png', 'hands/Left-hand/png/left-hand-5.png'];






  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer,
    private svgOptimizer: SvgOptimizerService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    await this.loadInitialSvgs();
    await this.loadSvgSets(this.backgroundSvgPaths, this.backgroundSvgs);
    await this.loadSvgSets(this.faceSvgPaths, this.faceSvgs);
    await this.loadSvgSets(this.rightHandSvgPaths, this.rightHandSvgs);
    await this.loadSvgSets(this.leftHandSvgPaths, this.leftHandSvgs);
    await this.loadSvgSets(this.backgroundSvgPaths, this.backgroundSvgs);
    await this.loadSvgSets(this.avaFacePaths, this.avaFaceSvgs);
    await this.loadSvgSets(this.jennaFacePaths, this.jennaFaceSvgs);

    
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['faceSvg1'] && this.faceSvg1) {
      console.log('face changed:', this.faceSvg1);
        this.selectedFace = this.faceSvg1[0].toString();
        this.faceSvg = this.selectedFace;
        this.selectedCharacter = this.faceSvg1[1];
        this.combineAndDisplaySvgs();
    }
  
    if (changes['assetsColor'] && this.assetsColor) {
      // Handle assetsColor changes
      console.log('assetsColor changed:', this.assetsColor);
      const [element, color] = this.assetsColor;
      this.onColorChange(element, color);
    }

    if(changes['postureSelected'] && this.postureSelected) {
      if(this.postureSelected == 'standing') {
        this.legsSvg = await this.svgService.loadSvg('leg/standing.svg');
        this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
        this.combineAndDisplaySvgs();
      }
      else if(this.postureSelected == 'walking') {
        this.legsSvg = await this.svgService.loadSvg('leg/walking.svg');
        this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
        this.combineAndDisplaySvgs();
      }
      else if (this.postureSelected == 'siting') {
        this.legsSvg = await this.svgService.loadSvg('leg/siting.svg');
        this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
        this.combineAndDisplaySvgs();
      }
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  

  private async loadInitialSvgs() {
    this.backgroundSvg = await this.svgService.loadSvg('backgrounds/9.svg');
    this.faceSvg = await this.svgService.loadSvg('face1.svg');
    this.faceSvg = await this.svgOptimizer.optimize(this.faceSvg);
    this.bodySvg = await this.svgService.loadSvg('body.svg');
    this.bodySvg = await this.svgOptimizer.optimize(this.bodySvg);
    this.leftHandSvg = await this.svgService.loadSvg('hands/Left-hand/left-hand-1.svg');
    this.leftHandSvg = await this.svgOptimizer.optimize(this.leftHandSvg);
    this.rightHandSvg = await this.svgService.loadSvg('hands/Right-hand/right-hand-3.svg');
    this.rightHandSvg = await this.svgOptimizer.optimize(this.rightHandSvg);
    this.legsSvg = await this.svgService.loadSvg('leg/standing.svg');
    this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
  }

  private async loadSvgSets(paths: string[], svgArray: SafeHtml[]) {
    try {
      for (const path of paths) {
        const svg = await this.svgService.loadSvg(path);
        const sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
        svgArray.push(sanitizedSvg);
      }
    } catch (error) {
      console.error('Error loading SVGs:', error);
    }
  }

  async onFaceClick(face: SafeHtml) {
    this.selectedFace = face.toString();
    this.faceSvg = this.selectedFace;
    console.log('Selected face:', face);
    // if(this.selectedSkinColor=''){
    //   this.selectedSkinColor = this.skinColors[1];
    // }
    await this.combineAndDisplaySvgs();
  }

  async onHandClick(hand: SafeHtml,handChoosen: string) {
    if(handChoosen == "right") {
      this.selectedRightHand = hand.toString();
      this.rightHandSvg = this.selectedRightHand;
    }
    else if(handChoosen == "left") {
      this.selectedLeftHand = hand.toString();
      this.leftHandSvg = this.selectedLeftHand;
    }
    else {
      console.log("something wrong in the hand selection")
    }
    
    console.log('Selected hand:', hand);
    await this.combineAndDisplaySvgs();
  }

  async selectBackground(option: any) {

    this.selectedBackground = option.image;

    this.backgroundSvg = await this.svgService.loadSvg(option.svg);
    if(this.selectedBackground == 'backgrounds/1.svg') {
      this.backgroundSvg = '';
    }

    // this.backgroundSvg = option.svg.toString();
    this.showPopup = false;
    this.combineAndDisplaySvgs();
  }


  private async combineAndDisplaySvgs() {
    const svgContainer = document.getElementById('svg-container');
    if (!svgContainer) return;
    this.sitingX = 150;
    this.sitingY = 0;
   
    if(this.postureSelected == 'siting' ) {
      this.sitingX = 200;
      this.sitingY = 160;
    }

  
    const svgContent = ` 
    <svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
      ${this.backgroundSvg ? `<g id="background" transform="translate(${0}, -100)">${this.backgroundSvg}</g>` : ''}
      <g id="face" transform="translate(${502 + this.sitingX}, ${150 + this.sitingY})">${this.faceSvg}</g>
      <g id="body" transform="translate(${550 + this.sitingX}, ${325 + this.sitingY})">${this.bodySvg}</g>
      <g id="legs" transform="translate(${350 + this.sitingX}, ${475 + this.sitingY})">${this.legsSvg}</g>
      <g id="left-hand" transform="translate(${604 + this.sitingX}, ${259 + this.sitingY})">${this.leftHandSvg}</g>
      <g id="right-hand" transform="translate(${375 + this.sitingX}, ${328 + this.sitingY})">${this.rightHandSvg}</g>
    </svg>
  `;

    try {
      const optimizedSvg = await this.svgOptimizer.optimize(svgContent);
      svgContainer.innerHTML = optimizedSvg;
      this.applyColors(svgContainer);
      this.svgContainerData = true;
    } catch (error) {
      console.error('Error optimizing SVG:', error);
    }
  }

  private applyColors(svgContainer: HTMLElement) {
    const svgElements = svgContainer.querySelectorAll('svg');
    svgElements.forEach(svgElement => {
      if (this.selectedSkinColor) {
        this.changeColor(svgElement as SVGElement, '.skin', this.selectedSkinColor);
      }
      if (this.selectedTopColor) {
        this.changeColor(svgElement as SVGElement, '.top', this.selectedTopColor);
      }
      if (this.selectedPantColor) {
        this.changeColor(svgElement as SVGElement, '.pant', this.selectedPantColor);
      }
    });
  }

  ngAfterViewInit(): void {

    
  }

  downloadSVG() {
    const svgElement = document.getElementById('svg-container')?.innerHTML;
    if (!svgElement) return;

    const svgBlob = new Blob([svgElement], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    this.downloadFile(svgUrl, 'illustration.svg');
  }

  async downloadPNG() {
    const svgContainer = document.getElementById('svg-container');
    if (!svgContainer) return;

    const svgElement = svgContainer.innerHTML;
    if (!svgElement) return;

    const sanitizedSvg = svgElement.replace(/(\r\n|\n|\r)/gm, "").trim();
    const base64Svg = window.btoa(unescape(encodeURIComponent(sanitizedSvg)));
    const svgDataUrl = `data:image/svg+xml;base64,${base64Svg}`;

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            this.downloadFile(pngUrl, 'illustration.png');
            URL.revokeObjectURL(pngUrl);
          }
        }, 'image/png');
      }
    };
    image.onerror = (err) => console.error('Failed to load image', err);
    image.src = svgDataUrl;
  }

  private downloadFile(url: string, filename: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  onColorChange(element: string, color: string) {
    const svgContainer = document.getElementById('svg-container');
    if (!svgContainer) return;

    switch(element) {
      case "skin":
        this.selectedSkinColor = color;
        break;
      case "top":
        this.selectedTopColor = color;
        break;
      case "pant":
        this.selectedPantColor = color;
        break;
    }

    this.applyColors(svgContainer);
  }

  private changeColor(svgElement: SVGElement, selector: string, color: string) {
    svgElement.querySelectorAll(selector).forEach(element => {
      (element as SVGElement).setAttribute('fill', color);
    });
  }
}
