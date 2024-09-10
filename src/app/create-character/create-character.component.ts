import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, input, HostListener } from '@angular/core';
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
  @Input() genderSelected: string = '';




  // @ViewChild('myCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  // private context!: CanvasRenderingContext2D;

  selectedSkinColor: string | null = null;
  selectedTopColor: string | null = null;
  selectedPantColor: string | null = null;
  selectedHairColor: string | null = null;
  selectedShoeColor: string | null = null;


  sitingX: number = 0;
  sitingY: number = 0;
  selectedTab: string = 'face';


  skinColors: string[] = ['#E98C7B', '#F4BCA4', '#FFB784', '#F3A396', '#B2674B'];
  topColors: string[] = ['#78A9FF','#EF5DA8','#F3BB9D'];
  pantColors: string[] = ['#001D6C','#EF5DA8'];

  isVisible = false;
  x = 0;
  y = 0;

  showPopup = false;
  selectedBackground = 'default-background.svg';

  backgroundOptions = [
    { image: 'backgrounds/1.svg', svg: 'backgrounds/1.svg' },
    { image: 'backgrounds/2.svg', svg: 'backgrounds/2.svg' },
    { image: 'backgrounds/3.svg', svg: 'backgrounds/3.svg' },
    { image: 'backgrounds/5.svg', svg: 'backgrounds/5.svg' },
    { image: 'backgrounds/6.svg', svg: 'backgrounds/6.svg' },
    { image: 'backgrounds/9.svg', svg: 'backgrounds/9.svg' },
    { image: 'backgrounds/10.svg', svg: 'backgrounds/10.svg' },
    { image: 'backgrounds/11.svg', svg: 'backgrounds/11.svg' }
  ];

  selectedFace: string | null = null;
  selectedRightHand: string | null = null;
  selectedLeftHand: string | null = null;
  selectedHandsTogether: string | null = null;

  selectedCharacter: string | null = null;



  faceSvgs: SafeHtml[] = [];
  femaleRightHandSvgs: SafeHtml[] = [];
  femaleLeftHandSvgs: SafeHtml[] = [];
  maleLeftHandSvgs: SafeHtml[] = [];
  maleRightHandSvgs: SafeHtml[] = [];
  handsTogetherSvgs: SafeHtml[] = [];
  maleHandsTogetherSvgs: SafeHtml[] = [];
  backgroundSvgs: SafeHtml[] = [];
  customLogo: any;
  avaFaceSvgs: SafeHtml[] = [];
  jennaFaceSvgs: SafeHtml[] = [];
  saraFaceSvgs: SafeHtml[] = [];
  adamFaceSvgs: SafeHtml[] = [];
  bobFaceSvgs: SafeHtml[] = [];
  timFaceSvgs: SafeHtml[] = [];
  jimmyFaceSvgs: SafeHtml[] = [];
  rohanFaceSvgs: SafeHtml[] = [];


  faceSvg: string = 'body.svg';
  // bodySvg: string = 'body.svg';
  femaleBodySvg: string = 'body.svg';
  maleBodySvg: string = 'top.svg';

  femaleLeftHandSvg: string = 'left-hand.svg';
  maleLeftHandSvg: string = 'male-left-hand.svg';
  femaleRightHandSvg: string | null = null;
  maleRightHandSvg: string | null = null;
  handTogeteherSvg: string | null = null;
  legsSvg: string = 'leg/standing.svg';
  maleLegsSvg:  string = 'leg/male/male-standing.svg';
  maleNeckSvg:  string = 'neck.svg';
  maleTopRightHand:  string = 'top-right-hand.svg';
  maleTopLefttHand:  string = 'top-left-hand.svg';



  backgroundSvg: string = 'backgrounds/9.svg'
  svgContainerData: boolean =false;

  // customLogo: string = ''; // Holds the modified SVG
  selectedColor: string = ''; // Default color (white)
  selectedOpacity: number = 1; // Default opacity (1 = fully opaque)

  faceSvgPaths = ['Face-1.svg', 'Face-2.svg', 'Face-3.svg'];
  femaleRightHandSvgPaths = ['hands/Right-hand/right-hand-1.svg', 'hands/Right-hand/right-hand-2.svg', 'hands/Right-hand/right-hand-3.svg', 'hands/Right-hand/right-hand-4.svg', 'hands/Right-hand/right-hand-5.svg'];
  femaleLeftHandSvgPaths = ['hands/Left-hand/left-hand-1.svg', 'hands/Left-hand/left-hand-2.svg', 'hands/Left-hand/left-hand-3.svg', 'hands/Left-hand/left-hand-4.svg', 'hands/Left-hand/left-hand-5.svg'];
  maleLeftHandSvgPaths = ['hands/Left-hand/male/left-hand-1.svg', 'hands/Left-hand/male/left-hand-2.svg', 'hands/Left-hand/male/left-hand-3.svg', 'hands/Left-hand/male/left-hand-4.svg'];
  maleRightHandSvgPaths = ['hands/Right-hand/male/right-hand-1.svg', 'hands/Right-hand/male/right-hand-2.svg', 'hands/Right-hand/male/right-hand-3.svg'];

  handTogetherSvgPaths = ['hands/Hands-together/hands-together-1.svg', 'hands/Hands-together/hands-together-2.svg', 'hands/Hands-together/hands-together-3.svg'];
  maleHandTogetherSvgPaths = ['hands/Hands-together/male/hands-together-1.svg', 'hands/Hands-together/male/hands-together-2.svg'];

  backgroundSvgPaths = ['backgrounds/1.svg','backgrounds/2.svg','backgrounds/3.svg','backgrounds/5.svg','backgrounds/6.svg','backgrounds/8.svg']
  avaFacePaths = ['face/female/Ava/Ava-1.svg','face/female/Ava/Ava-2.svg','face/female/Ava/Ava-3.svg','face/female/Ava/Ava-4.svg','face/female/Ava/Ava-5.svg','face/female/Ava/Ava-6.svg','face/female/Ava/Ava-7.svg'];
  jennaFacePaths = ['face/female/Jenna/Jenna-1.svg','face/female/Jenna/Jenna-2.svg','face/female/Jenna/Jenna-3.svg','face/female/Jenna/Jenna-4.svg','face/female/Jenna/Jenna-5.svg','face/female/Jenna/Jenna-6.svg','face/female/Jenna/Jenna-7.svg','face/female/Jenna/Jenna-8.svg','face/female/Jenna/Jenna-9.svg'];
  saraFacePaths = ['face/female/Sara/Sara-1.svg','face/female/Sara/Sara-2.svg','face/female/Sara/Sara-3.svg','face/female/Sara/Sara-4.svg','face/female/Sara/Sara-5.svg','face/female/Sara/Sara-6.svg','face/female/Sara/Sara-7.svg','face/female/Sara/Sara-8.svg','face/female/Sara/Sara-9.svg'];
  adamFacePaths = ['face/male/Adam/Adam-1.svg','face/male/Adam/Adam-2.svg','face/male/Adam/Adam-3.svg','face/male/Adam/Adam-4.svg','face/male/Adam/Adam-5.svg','face/male/Adam/Adam-6.svg','face/male/Adam/Adam-7.svg','face/male/Adam/Adam-8.svg','face/male/Adam/Adam-9.svg','face/male/Adam/Adam-10.svg'];
  bobFacePaths = ['face/male/Bob/Bob-1.svg','face/male/Bob/Bob-2.svg','face/male/Bob/Bob-3.svg','face/male/Bob/Bob-4.svg','face/male/Bob/Bob-5.svg','face/male/Bob/Bob-6.svg','face/male/Bob/Bob-7.svg','face/male/Bob/Bob-8.svg','face/male/Bob/Bob-9.svg','face/male/Bob/Bob-10.svg'];
  timFacePaths = ['face/male/Tim/Tim-1.svg','face/male/Tim/Tim-2.svg','face/male/Tim/Tim-3.svg','face/male/Tim/Tim-4.svg','face/male/Tim/Tim-5.svg','face/male/Tim/Tim-6.svg','face/male/Tim/Tim-7.svg','face/male/Tim/Tim-8.svg','face/male/Tim/Tim-9.svg','face/male/Tim/Tim-10.svg'];
  jimmyFacePaths = ['face/male/Jimmy/Jimmy-1.svg','face/male/Jimmy/Jimmy-2.svg','face/male/Jimmy/Jimmy-3.svg','face/male/Jimmy/Jimmy-4.svg','face/male/Jimmy/Jimmy-5.svg','face/male/Jimmy/Jimmy-6.svg','face/male/Jimmy/Jimmy-7.svg','face/male/Jimmy/Jimmy-8.svg','face/male/Jimmy/Jimmy-9.svg','face/male/Jimmy/Jimmy-10.svg'];
  rohanFacePaths = ['face/male/Rohan/Rohan-1.svg','face/male/Rohan/Rohan-2.svg','face/male/Rohan/Rohan-3.svg','face/male/Rohan/Rohan-4.svg','face/male/Rohan/Rohan-5.svg','face/male/Rohan/Rohan-6.svg','face/male/Rohan/Rohan-7.svg','face/male/Rohan/Rohan-8.svg','face/male/Rohan/Rohan-9.svg','face/male/Rohan/Rohan-10.svg'];


  rightHandPngPaths = ['hands/Right-hand/png/right-hand-1.png', 'hands/Right-hand/png/right-hand-2.png', 'hands/Right-hand/png/right-hand-3.png', 'hands/Right-hand/png/right-hand-4.png', 'hands/Right-hand/png/right-hand-5.png'];
  maleRightHandPngPaths = ['hands/Right-hand/male/png/right-hand-1.png', 'hands/Right-hand/male/png/right-hand-2.png', 'hands/Right-hand/male/png/right-hand-3.png'];
  leftHandPngPaths = ['hands/Left-hand/png/left-hand-1.png', 'hands/Left-hand/png/left-hand-2.png', 'hands/Left-hand/png/left-hand-3.png', 'hands/Left-hand/png/left-hand-4.png', 'hands/Left-hand/png/left-hand-5.png'];
  maleLeftHandPngPaths = ['hands/Left-hand/male/png/left-hand-1.png', 'hands/Left-hand/male/png/left-hand-2.png', 'hands/Left-hand/male/png/left-hand-3.png','hands/Left-hand/male/png/left-hand-4.png'];
  
  
  maleFacePngs = ['face/male/face-1.png','face/male/face-2.png','face/male/face-3.png','face/male/face-4.png','face/male/face-5.png']
  femaleFacePngs = ['face/female/face-1.png','face/female/face-2.png','face/female/face-3.png']
  handsTogetherPngPaths = ['hands/Hands-together/png/hands-together-1.png', 'hands/Hands-together/png/hands-together-2.png', 'hands/Hands-together/png/hands-together-3.png'];
  maleHandTogetherPngPaths = ['hands/Hands-together/male/png/hands-together-1.png', 'hands/Hands-together/male/png/hands-together-2.png'];


  pantCombinations: Array<{ pantColor: string, pantBottomColor: string, pantOutlineColor: string }> = [
    {
      pantColor: '#001D6C',       // Red pant color
      pantBottomColor: '#002D9C', // Blue pant bottom color
      pantOutlineColor: '#0043CE'     // Green outline color
    },
    {
      pantColor: '#022D0D',       // Green pant color
      pantBottomColor: '#044317', // Magenta pant bottom color
      pantOutlineColor: '#0E6027'     // Black outline color
    },
    {
      pantColor: '#001141',       // Blue pant color
      pantBottomColor: '#001D6C', // Yellow pant bottom color
      pantOutlineColor: '#0053FF'     // Red outline color
    }
  ];

  shoeCombinations: Array<{ shoeSoleColor: string, shoelaceColor: string, shoeTongueColor: string }> = [
    {
      shoeSoleColor: '#A6C8FF',       // Red pant color
      shoelaceColor: '#001D6C', // Blue pant bottom color
      shoeTongueColor: '#FFFFFF'     // Green outline color
    },
    {
      shoeSoleColor: '#6FDC8C',       // Green pant color
      shoelaceColor: '#022D0D', // Magenta pant bottom color
      shoeTongueColor: '#A7F0BA'     // Black outline color
    },
    {
      shoeSoleColor: '#D9D1C7',       // Blue pant color
      shoelaceColor: '#2B241D', // Yellow pant bottom color
      shoeTongueColor: '#E7E0DA'     // Red outline color
    },
    {
      shoeSoleColor: '#001141',       // Blue pant color
      shoelaceColor: '#001141', // Yellow pant bottom color
      shoeTongueColor: '#FFF5E5'     // Red outline color
    }

  ];

  maleFaceNames = ['tim','adam','jimmy','rohan','bob'];
  femaleFaceNames = ['ava','sara','anne']

  svgPreview: SafeHtml | null = null;


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
    await this.loadSvgSets(this.femaleRightHandSvgPaths, this.femaleRightHandSvgs);
    await this.loadSvgSets(this.femaleLeftHandSvgPaths, this.femaleLeftHandSvgs);
    await this.loadSvgSets(this.maleLeftHandSvgPaths, this.maleLeftHandSvgs);
    await this.loadSvgSets(this.maleRightHandSvgPaths, this.maleRightHandSvgs);
    await this.loadSvgSets(this.handTogetherSvgPaths, this.handsTogetherSvgs);
    await this.loadSvgSets(this.maleHandTogetherSvgPaths, this.maleHandsTogetherSvgs);
    await this.loadSvgSets(this.backgroundSvgPaths, this.backgroundSvgs);
    await this.loadSvgSets(this.avaFacePaths, this.avaFaceSvgs);
    await this.loadSvgSets(this.jennaFacePaths, this.jennaFaceSvgs);
    await this.loadSvgSets(this.saraFacePaths, this.saraFaceSvgs);
    await this.loadSvgSets(this.adamFacePaths, this.adamFaceSvgs);
    await this.loadSvgSets(this.bobFacePaths, this.bobFaceSvgs);
    await this.loadSvgSets(this.timFacePaths, this.timFaceSvgs);
    await this.loadSvgSets(this.rohanFacePaths, this.rohanFaceSvgs);
    await this.loadSvgSets(this.jimmyFacePaths, this.jimmyFaceSvgs);


    if(this.genderSelected == 'female') {
      this.selectedRightHand = this.femaleRightHandSvgs[1].toString();
      this.selectedLeftHand = this.femaleLeftHandSvgs[1].toString();
      this.femaleRightHandSvg = this.selectedRightHand;
      this.femaleLeftHandSvg = this.selectedLeftHand;
    }
    else {
      this.selectedRightHand = this.maleRightHandSvgs[0].toString();
      this.selectedLeftHand = this.maleLeftHandSvgs[0].toString();
      this.maleRightHandSvg = this.selectedRightHand;
      this.maleLeftHandSvg = this.selectedLeftHand;
    }

    this.selectedBackground = this.backgroundSvgPaths[1];
    this.selectedFace = this.faceSvgs[1].toString();

  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  maleFacePath() {
    if(this.selectedCharacter) {
      const index = this.maleFaceNames.indexOf(this.selectedCharacter);
      if (index !== -1) {
        console.log(this.maleFacePngs[index])
        return this.maleFacePngs[index]; // Returns the index if found
      } else {
        return -1; // Returns -1 if the input is not found in the array
      }
    }
    else {
      return this.maleFacePngs[0];
    }
  }

  onSvgUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => {
        let svgContent = reader.result as string;
  
        // Create a temporary div to parse and manipulate the SVG content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgContent;
  
        // Extract the SVG element
        const svgElement = tempDiv.querySelector('svg') as SVGElement;
  
        if (svgElement) {
          // Resize Logic
          const widthAttr = svgElement.getAttribute('width');
          const heightAttr = svgElement.getAttribute('height');
  
          if (widthAttr && heightAttr) {
            const originalWidth = parseFloat(widthAttr);
            const originalHeight = parseFloat(heightAttr);
  
            const aspectRatio = originalWidth / originalHeight;
  
            let newWidth = 70;
            let newHeight = 70;
  
            if (aspectRatio > 1) {
              newHeight = newWidth / aspectRatio;
            } else {
              newWidth = newHeight * aspectRatio;
            }
  
            svgElement.setAttribute('width', newWidth.toString());
            svgElement.setAttribute('height', newHeight.toString());
  
            const viewBox = svgElement.getAttribute('viewBox') || `0 0 ${originalWidth} ${originalHeight}`;
            svgElement.setAttribute('viewBox', viewBox);
          }
  
          // Save the original SVG content before color change
          this.svgPreview = this.sanitizer.bypassSecurityTrustHtml(svgElement.outerHTML);
          this.customLogo = svgElement.outerHTML;
          this.combineAndDisplaySvgs();
          console.log('SVG Uploaded:', this.customLogo);
        }
      };
      reader.readAsText(file);

    } else {
      alert('Please upload a valid SVG file.');
    }
  }
  
  applyColorChange(selectedColor: string, selectedOpacity: number): void {
    if (this.customLogo) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.customLogo;
  
      const svgElement = tempDiv.querySelector('svg') as SVGElement;
  
      if (svgElement) {
        // Find all <g> and <path> elements and remove group-level styles
        const groupElements = svgElement.querySelectorAll('g');
        groupElements.forEach((group: Element) => {
          group.removeAttribute('style');  // Remove group-level styles
        });
  
        // Apply color and opacity to <path> elements
        const allElements = svgElement.querySelectorAll('path');
        allElements.forEach((element: Element) => {
          const svgElem = element as SVGElement;
  
          // Set fill color
          svgElem.setAttribute('fill', selectedColor); 
  
          // Optionally set stroke if needed (e.g. for outlines)
          svgElem.setAttribute('stroke', selectedColor); 
  
          // Set opacity
          svgElem.setAttribute('opacity', selectedOpacity.toString());
        });
  
        // Update the SVG preview with new colors and opacity
        this.svgPreview = this.sanitizer.bypassSecurityTrustHtml(svgElement.outerHTML);
        this.customLogo = svgElement.outerHTML;
        this.combineAndDisplaySvgs();
      }
    }
  }
  
  
  async ngOnChanges(changes: SimpleChanges) {

    if (changes['genderSelected'] && this.genderSelected) {
      this.svgContainerData =false;
      const svgContainer = document.getElementById('svg-container');
      if(svgContainer) {
        svgContainer.innerHTML = '';
        this.selectedCharacter = '';
        this.selectedHandsTogether = null;
        this.handTogeteherSvg = '';
        this.selectedFace = '';
        this.selectedCharacter = '';
        if(this.genderSelected == 'male') {
          if(this.maleRightHandSvgs[0]) {
            this.selectedRightHand = this.maleRightHandSvgs[0].toString();
            this.maleRightHandSvg = this.selectedRightHand;
          }
          if(this.maleLeftHandSvgs[0]) {
            this.selectedLeftHand = this.maleLeftHandSvgs[0].toString();
            this.maleLeftHandSvg = this.selectedLeftHand;
          }
          this.postureSelected == 'standing'
          this.maleLegsSvg = await this.svgService.loadSvg('leg/male/male-standing.svg');
          this.maleLegsSvg = await this.svgOptimizer.optimize(this.maleLegsSvg);

          if(this.selectedCharacter) {
            this.combineAndDisplaySvgs();
          }
        }
        else if(this.genderSelected == 'female') {
          if(this.femaleRightHandSvgs[1]) {
            this.selectedRightHand = this.femaleRightHandSvgs[1].toString();
              this.femaleRightHandSvg = this.selectedRightHand;
          }
          if(this.femaleLeftHandSvgs[1]) {
            this.selectedLeftHand = this.femaleLeftHandSvgs[1].toString();
            this.femaleLeftHandSvg = this.selectedLeftHand; 
          }
          this.postureSelected == 'standing'
          this.legsSvg = await this.svgService.loadSvg('leg/standing.svg');
          this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg); 
          if(this.selectedCharacter) {
            this.combineAndDisplaySvgs();
          }
        }
      }
    }

    if (changes['faceSvg1'] && this.faceSvg1) {
      if(this.selectedFace == '' ) {
        if(this.genderSelected == 'male') {
          if(this.maleRightHandSvgs[0]) {
            this.selectedRightHand = this.maleRightHandSvgs[0].toString();
            this.maleRightHandSvg = this.selectedRightHand;
          }
          if(this.maleLeftHandSvgs[0]) {
            this.selectedLeftHand = this.maleLeftHandSvgs[0].toString();
            this.maleLeftHandSvg = this.selectedLeftHand;
          }
        }
        else {
          if(this.femaleRightHandSvgs[1]) {
            this.selectedRightHand = this.femaleRightHandSvgs[1].toString();
            this.femaleRightHandSvg = this.selectedRightHand;
          }
          if(this.femaleLeftHandSvgs[1]) {
            this.selectedLeftHand = this.femaleLeftHandSvgs[1].toString();
            this.femaleLeftHandSvg = this.selectedLeftHand;  
          }
        }
      }

      this.selectedCharacter = this.faceSvg1[1];
      console.log('face changed:', this.faceSvg1);
      if(this.faceSvg1[0]) {
        this.selectedFace = this.faceSvg1[0].toString();
        this.faceSvg = this.selectedFace;
        console.log('hello' + this.selectedCharacter);
        console.log('selectedFace' + this.selectedFace);
      }

      if(this.selectedFace && this.selectedFace !== '' ){
        console.log('test passed',this.selectedCharacter);
      
        this.combineAndDisplaySvgs();
      } 
    }
  
    if (changes['assetsColor'] && this.assetsColor) {
      // Handle assetsColor changes
      console.log('assetsColor changed:', this.assetsColor);
      const [element, color] = this.assetsColor;
      this.onColorChange(element, color);
    }

    if(changes['postureSelected'] && this.postureSelected) {
      if(this.postureSelected == 'standing') {
        if(this.genderSelected == 'female') {
          this.legsSvg = await this.svgService.loadSvg('leg/standing.svg');
          this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
          if(this.selectedCharacter && this.selectedCharacter !== ''  && this.genderSelected == 'female' ){
            this.combineAndDisplaySvgs();
          }
        }
        else {
          this.maleLegsSvg = await this.svgService.loadSvg('leg/male/male-standing.svg');
          this.maleLegsSvg = await this.svgOptimizer.optimize(this.maleLegsSvg);
          if(this.selectedCharacter && this.selectedCharacter !== ''  && this.genderSelected == 'male' ){
            this.combineAndDisplaySvgs();
          }
        }
       
      }
      else if(this.postureSelected == 'walking') { 
        if(this.genderSelected == 'female') {
          this.legsSvg = await this.svgService.loadSvg('leg/walking.svg');
          this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
          if(this.selectedCharacter && this.selectedCharacter !== '' && this.genderSelected == 'female' ){
            this.combineAndDisplaySvgs();
          }
        }
        else {
          this.maleLegsSvg = await this.svgService.loadSvg('leg/male/male-walking.svg');
          this.maleLegsSvg = await this.svgOptimizer.optimize(this.maleLegsSvg);
          if(this.selectedCharacter && this.selectedCharacter !== ''  && this.genderSelected == 'male' ){
            this.combineAndDisplaySvgs();
          }
        }
       
      }
      else if (this.postureSelected == 'siting') {
        if(this.genderSelected == 'female') { 
          this.legsSvg = await this.svgService.loadSvg('leg/siting.svg');
          this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
          if(this.selectedCharacter && this.selectedCharacter !== ''  && this.genderSelected == 'female' ){
            this.combineAndDisplaySvgs();
          }
        }
        else {
          this.maleLegsSvg = await this.svgService.loadSvg('leg/male/male-siting.svg');
          this.maleLegsSvg = await this.svgOptimizer.optimize(this.maleLegsSvg);
          if(this.selectedCharacter && this.selectedCharacter !== ''  && this.genderSelected == 'male' ){
            this.combineAndDisplaySvgs();
          }
        }
      }
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  

  private async loadInitialSvgs() {
    this.backgroundSvg = await this.svgService.loadSvg(this.backgroundSvgPaths[1]);
    this.faceSvg = await this.svgService.loadSvg(this.faceSvgPaths[1]);
    this.faceSvg = await this.svgOptimizer.optimize(this.faceSvg);
    this.femaleBodySvg = await this.svgService.loadSvg('body.svg');
    this.femaleBodySvg = await this.svgOptimizer.optimize(this.femaleBodySvg);
    this.maleBodySvg = await this.svgService.loadSvg('top.svg');
    this.maleBodySvg = await this.svgOptimizer.optimize(this.maleBodySvg);
    this.femaleLeftHandSvg = await this.svgService.loadSvg(this.femaleLeftHandSvgPaths[1]);
    this.femaleLeftHandSvg = await this.svgOptimizer.optimize(this.femaleLeftHandSvg);
    this.maleLeftHandSvg = await this.svgService.loadSvg(this.maleLeftHandSvgPaths[0]);
    this.maleLeftHandSvg = await this.svgOptimizer.optimize(this.maleLeftHandSvg);
    this.femaleRightHandSvg = await this.svgService.loadSvg(this.femaleRightHandSvgPaths[1]);
    this.femaleRightHandSvg = await this.svgOptimizer.optimize(this.femaleRightHandSvg);
    this.maleRightHandSvg = await this.svgService.loadSvg(this.maleRightHandSvgPaths[0]);
    this.maleRightHandSvg = await this.svgOptimizer.optimize(this.maleRightHandSvg);
    this.legsSvg = await this.svgService.loadSvg('leg/standing.svg');
    this.legsSvg = await this.svgOptimizer.optimize(this.legsSvg);
    this.maleLegsSvg = await this.svgService.loadSvg('leg/male/male-standing.svg');
    this.maleLegsSvg = await this.svgOptimizer.optimize(this.maleLegsSvg);
    this.maleNeckSvg = await this.svgService.loadSvg('neck.svg');
    this.maleNeckSvg = await this.svgOptimizer.optimize(this.maleNeckSvg);
    this.maleTopLefttHand = await this.svgService.loadSvg('top-left-hand.svg');
    this.maleTopLefttHand = await this.svgOptimizer.optimize(this.maleTopLefttHand);
    this.maleTopRightHand = await this.svgService.loadSvg('top-right-hand.svg');
    this.maleTopRightHand = await this.svgOptimizer.optimize(this.maleTopRightHand);
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

  closePopup(event: Event) {
    event.stopPropagation();
    this.showPopup = false;
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
      this.selectedHandsTogether = null;
      this.handTogeteherSvg = '';
      this.selectedRightHand = hand.toString();
      if(this.genderSelected == 'male') { 
      this.maleRightHandSvg = this.selectedRightHand;
      }
      else {
        this.femaleRightHandSvg = this.selectedRightHand;
      }
    }
    if(handChoosen == "left") {
      this.selectedHandsTogether = null;
      this.handTogeteherSvg = '';
      this.selectedLeftHand = hand.toString();
      if(this.genderSelected == 'male') { 
          this.maleLeftHandSvg = this.selectedLeftHand;
        }
        else {
          this.femaleLeftHandSvg = this.selectedLeftHand;
        }
    }
    if(handChoosen == "handsTogether"){
      this.femaleLeftHandSvg = '';
      this.femaleRightHandSvg = '';
      this.maleRightHandSvg = '';
      this.maleLeftHandSvg = '';
      this.selectedLeftHand = null;
      this.selectedRightHand = null;

      this.selectedHandsTogether = hand.toString();
      this.handTogeteherSvg = this.selectedHandsTogether;
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


    if(this.genderSelected ==  'female') {
      const svgContent = ` 
      <svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
        ${this.backgroundSvg ? `<g id="background" transform="translate(${0}, -100)">${this.backgroundSvg}</g>` : ''}
        <g id="character-elements">
          <g id="face" transform="translate(${502 + this.sitingX}, ${150 + this.sitingY})">${this.faceSvg}</g>
          <g id="body" transform="translate(${550 + this.sitingX}, ${325 + this.sitingY})">${this.femaleBodySvg}</g>
          <g id="legs" transform="translate(${350 + this.sitingX}, ${475 + this.sitingY})">${this.legsSvg}</g>
          ${this.customLogo ? `<g id="background" transform="translate(${585 + this.sitingX}, ${385 + this.sitingY})">${this.customLogo}</g>` : ''}
          ${this.femaleLeftHandSvg ? `<g id="left-hand" transform="translate(${604 + this.sitingX}, ${259 + this.sitingY})">${this.femaleLeftHandSvg}</g>` : ''}
          ${this.femaleRightHandSvg ? `<g id="right-hand" transform="translate(${375 + this.sitingX}, ${328 + this.sitingY})">${this.femaleRightHandSvg}</g>` : ''}
          ${this.handTogeteherSvg ? `<g id="right-hand" transform="translate(${330 + this.sitingX}, ${305 + this.sitingY})">${this.handTogeteherSvg}</g>` : ''}
        </g>
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
    else {
      // this.sitingY = -70;
      const svgContent = ` 
      <svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
        ${this.backgroundSvg ? `<g id="background" transform="translate(${0}, -100)">${this.backgroundSvg}</g>` : ''}
        
        <!-- Grouping all elements except the background -->
        <g id="character-elements">
          <g id="face" transform="translate(${504 + this.sitingX}, ${85 + this.sitingY})">${this.faceSvg}</g>
          <g id="legs" transform="translate(${285 + this.sitingX}, ${460 + this.sitingY})">${this.maleLegsSvg}</g>
          <g id="body" transform="translate(${490 + this.sitingX}, ${255 + this.sitingY})">${this.maleBodySvg}</g>
          <g id="neck" transform="translate(${524 + this.sitingX}, ${253 + this.sitingY})">${this.maleNeckSvg}</g>
          
          ${this.maleLeftHandSvg ? `<g id="left-hand" transform="translate(${582 + this.sitingX}, ${190 + this.sitingY})">${this.maleLeftHandSvg}</g>` : ''}
          ${this.maleRightHandSvg ? `<g id="right-hand" transform="translate(${312 + this.sitingX}, ${252 + this.sitingY})">${this.maleRightHandSvg}</g>` : ''}
          
          ${this.customLogo ? `<g id="logo" transform="translate(${535 + this.sitingX}, ${325 + this.sitingY})">${this.customLogo}</g>` : ''}
          ${this.handTogeteherSvg ? `<g id="hands-together" transform="translate(${280 + this.sitingX}, ${234 + this.sitingY})">${this.handTogeteherSvg}</g>` : ''}
        </g>
      </svg>
    `;
    console.log('hand together',this.maleLegsSvg)
      try {
        const optimizedSvg = await this.svgOptimizer.optimize(svgContent);
        svgContainer.innerHTML = optimizedSvg;
        this.applyColors(svgContainer);
        this.svgContainerData = true;
      } catch (error) {
        console.error('Error optimizing SVG:', error);
      }
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
        // this.changeColor(svgElement as SVGElement, '.pant', this.selectedPantColor);
        let index = this.pantCombinations.findIndex(item => item.pantColor === this.selectedPantColor);
        this.changeColor(svgElement as SVGElement, '.pant', this.pantCombinations[index].pantColor);
        this.changeColor(svgElement as SVGElement, '.pantBottomColor', this.pantCombinations[index].pantBottomColor);
        this.changeColor(svgElement as SVGElement, '.pantOutlineColor', this.pantCombinations[index].pantOutlineColor);
        this.changeStrokeColor(svgElement as SVGElement, '.pantOutlineStrokeColor', this.pantCombinations[index].pantOutlineColor);

      }
      if (this.selectedHairColor) {
        this.changeColor(svgElement as SVGElement, '.hair', this.selectedHairColor);
      }
      if (this.selectedShoeColor) {
        let index = this.shoeCombinations.findIndex(item => item.shoeSoleColor === this.selectedShoeColor);
        this.changeColor(svgElement as SVGElement, '.shoeSoleColor', this.shoeCombinations[index].shoeSoleColor);
        this.changeColor(svgElement as SVGElement, '.shoelaceColor', this.shoeCombinations[index].shoelaceColor);
        this.changeColor(svgElement as SVGElement, '.shoeTongueColor', this.shoeCombinations[index].shoeTongueColor);
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
      case "hair":
        this.selectedHairColor = color;
        break;
      case "shoe":
        this.selectedShoeColor = color;
        break;
    }

    this.applyColors(svgContainer);
  }

  private changeColor(svgElement: SVGElement, selector: string, color: string) {
    svgElement.querySelectorAll(selector).forEach(element => {
      (element as SVGElement).setAttribute('fill', color);
    });
  }
  private changeStrokeColor(svgElement: SVGElement, selector: string, color: string) {
    svgElement.querySelectorAll(selector).forEach(element => {
      (element as SVGElement).setAttribute('stroke', color);
    });
  }
}
