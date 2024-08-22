import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgService } from '../svg.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  selectedGender: string = 'female';
  selectedLeftMenuItem: string = '';
  selectedRightMenuItem: string = '';
  onColorChangeAssets: any[] = [];

  selectedSkinColor: string | null = null;
  selectedTopColor: string | null = null;
  selectedPantColor: string | null = null;
  selectedTab: string = "skin";


  standingSelected: boolean = true;
  walkingSelected: boolean = false;
  sitingSelected: boolean = false;



  hoveredColor: string | null = null; // Add this line

  faceSvgPaths = ['Face-1.svg', 'Face-2.svg', 'Face-3.svg'];
  faceSvgs: SafeHtml[] = [];
  femaleFacePngs = ['face/female/face-1.png','face/female/face-2.png','face/female/face-3.png']
  feamleFaceSelectedPngs = ['face/female/face-1-selected.png','face/female/face-2-selected.png','face/female/face-3-selected.png']
  faemaleFaceDeselectedPngs = ['face/female/face-1-deselected.png','face/female/face-2-deselected.png','face/female/face-3-deselected.png']
  avaFacePaths = ['face/female/Ava/Ava-1.svg','face/female/Ava/Ava-2.svg','face/female/Ava/Ava-3.svg','face/female/Ava/Ava-4.svg','face/female/Ava/Ava-5.svg','face/female/Ava/Ava-6.svg','face/female/Ava/Ava-7.svg'];
  
  maleFaceNames = ['Bob','Rohan']
  femaleFaceNames = ['Ava','Sara','Anne']

  maleFacePngs = ['face/female/face-1.png','face/female/face-2.png']
  maleFaceSelectedPngs = ['face/female/face-1-selected.png','face/female/face-2-selected.png','face/female/face-3-selected.png']
  maleFaceDeselectedPngs = ['face/female/face-1-deselected.png','face/female/face-2-deselected.png','face/female/face-3-deselected.png']

  // The index of the selected face
  selectedFaceIndex: number | null = null;

  skinColors: string[] = ['#E98C7B', '#F4BCA4', '#FFB784', '#F3A396', '#B2674B'];
  topColors: string[] = ['#78A9FF','#EF5DA8','#F3BB9D'];
  pantColors: string[] = ['#001D6C','#EF5DA8'];


  selectedFace1: any[] = [];
  selectedFace: string = '';
  selectedPosture: string = '';

  @Output() faceSelected = new EventEmitter<string[]>();
  @Output() skinColorSelected = new EventEmitter<string[]>();
  @Output() postureSelected = new EventEmitter<string>();



  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef

  ) {}

  async ngOnInit() {
    await this.loadSvgSets(this.faceSvgPaths, this.faceSvgs);
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

  selectTab(element: string){
    this.selectedTab = element;
  }

  postureSelection(element: string){
    if(element=='standing') {
      this.standingSelected = true;
      this.walkingSelected = false;
      this.sitingSelected = false;
      this.selectedPosture = 'standing';
      this.postureSelected.emit(this.selectedPosture);
    }
    else if(element=='walking') {
      this.standingSelected = false;
      this.walkingSelected = true;
      this.sitingSelected = false;
      this.selectedPosture = 'walking';
      this.postureSelected.emit(this.selectedPosture);
    }
    else {
      this.standingSelected = false;
      this.walkingSelected = false;
      this.sitingSelected = true;
      this.selectedPosture = 'siting';
      this.postureSelected.emit(this.selectedPosture);

    }
    console.log(this.sitingSelected);
  }

  onColorChange(element: string, color: string) {
    const svgContainer = document.getElementById('svg-container');
    if (!svgContainer) return;

    switch(element) {
      case "skin":
        this.onColorChangeAssets.push('skin',color);
        this.selectedSkinColor = color;
        break;
      case "top":
        this.onColorChangeAssets.push('top',color);
        this.selectedTopColor = color;
        break;
      case "pant":
        this.onColorChangeAssets.push('pant',color);
        this.selectedPantColor = color;
        break;
    }
    this.onColorChangeAssets = [element, color];
    console.log('Emitting:', this.onColorChangeAssets);

    // Create a copy and emit it
    const emitCopy = [...this.onColorChangeAssets];
    console.log('Emitting:', emitCopy);
    this.skinColorSelected.emit(emitCopy);
  }

  async onFaceClick(index: number) {
    // Set the selected face index
    this.selectedFaceIndex = index;
  
    if(this.isGenderSelected('male') )
    // Update the facePngs array based on the selected face
    this.maleFacePngs = this.maleFacePngs.map((_, i) =>
      i === index ? this.maleFaceSelectedPngs[i] : this.maleFaceDeselectedPngs[i]
    );
  
    // Fetch the corresponding SVG content for the selected face

    if(index == 0) {
      const selectedCharacter = 'ava';
      const svgPath = this.faceSvgPaths[index];
      const svgContent = await this.fetchSvgContent(svgPath);
      this.selectedFace1 = [svgContent,selectedCharacter];
      this.selectedFace = svgContent; // If using string, otherwise use SafeHtml as discussed earlier.
     
      const emitCopy = [...this.selectedFace1];
      console.log('Emitting:', emitCopy);
      this.faceSelected.emit(emitCopy);
      console.log('Emitted:', emitCopy);
    }
    else if(index == 1) {
      const selectedCharacter = 'sara';
      const svgPath = this.faceSvgPaths[index];
      const svgContent = await this.fetchSvgContent(svgPath);
      this.selectedFace1 = [svgContent,selectedCharacter];
      this.selectedFace = svgContent; 

      const emitCopy = [...this.selectedFace1];
      console.log('Emitting:', emitCopy);
      this.faceSelected.emit(emitCopy);
      console.log('Emitted:', emitCopy);
      
    }
    else {
      const selectedCharacter = 'jenna';
      const svgPath = this.faceSvgPaths[index];
      const svgContent = await this.fetchSvgContent(svgPath);
      this.selectedFace1 = [svgContent,selectedCharacter];
      this.selectedFace = svgContent; 

      const emitCopy = [...this.selectedFace1];
      console.log('Emitting:', emitCopy);
      this.faceSelected.emit(emitCopy);
      console.log('Emitted:', emitCopy);
    }


    

    if(this.selectedSkinColor == null) {
      this.selectedSkinColor = this.skinColors[0];
      this.onColorChange('skin', this.skinColors[0])
    }
    // console.log('Selected face SVG:', svgContent);
  }

  isFaceSelected(faceindex: number): boolean {
    return this.selectedFaceIndex === faceindex;
  }

  private async fetchSvgContent(path: string): Promise<string> {
    const response = await fetch(path);
    return await response.text();
  }

  isGenderSelected(gender: string): boolean {
    return this.selectedGender === gender;
  }

  genderSelection(gender: string): void {
    this.selectedGender = gender;
  }

  leftMenuSelection(menuItem: string): void {
    this.selectedLeftMenuItem = menuItem;
  }

  rightMenuSelection(menuItem: string): void {
    this.selectedRightMenuItem = menuItem;
  }

  getStyle(item: string): object {
    return {
      // fill: this.isItemSelected(item) ? '#FF0000' : 'none',
      // stroke: this.isItemSelected(item) ? '#FF0000' : '#557593',
      filter: this.isItemSelected(item) ? 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' : 'none'
    };
  }
  
  getIconStyle(item: string): object {
    return {
      fill: this.isItemSelected(item) ? '#FF0000' : '#363D61'
    };
  }
  
  isItemSelected(item: string): boolean {
    return this.selectedGender === item || this.selectedLeftMenuItem === item || this.selectedRightMenuItem === item;
  }

}
