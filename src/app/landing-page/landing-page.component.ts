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
  isCopied = false;

  selectedSkinColor: string | null = null;
  selectedTopColor: string | null = null;
  selectedPantColor: string | null = null;
  selectedHairColor: string | null = null;
  selectedShoeColor: string | null = null;


  selectedTab: string = "skin";


  standingSelected: boolean = true;
  walkingSelected: boolean = false;
  sitingSelected: boolean = false;



  hoveredColor: string | null = null; // Add this line

  femaleFaceSvgPaths = ['Face-1.svg', 'Face-2.svg', 'Face-3.svg', 'face/male/Bob/Bob-1.svg'];
  maleFaceSvgPaths = ['face/male/Tim/Tim-1.svg', 'face/male/Adam/Adam-1.svg', 'face/male/Jimmy/Jimmy-1.svg', 'face/male/Rohan/Rohan-1.svg', 'face/male/Bob/Bob-1.svg'];

  maleFaceSvgs: SafeHtml[] = [];
  femaleFaceSvgs: SafeHtml[] = [];

  femaleFacePngs = ['face/female/face-1.png','face/female/face-2.png','face/female/face-3.png']
  feamleFaceSelectedPngs = ['face/female/face-1-selected.png','face/female/face-2-selected.png','face/female/face-3-selected.png']
  faemaleFaceDeselectedPngs = ['face/female/face-1-deselected.png','face/female/face-2-deselected.png','face/female/face-3-deselected.png']
  avaFacePaths = ['face/female/Ava/Ava-1.svg','face/female/Ava/Ava-2.svg','face/female/Ava/Ava-3.svg','face/female/Ava/Ava-4.svg','face/female/Ava/Ava-5.svg','face/female/Ava/Ava-6.svg','face/female/Ava/Ava-7.svg'];
  
  maleFacePngs = ['face/male/face-1.png','face/male/face-2.png','face/male/face-3.png','face/male/face-4.png','face/male/face-5.png']
  
  maleFaceNames = ['Tim','Adam','Jimmy','Rohan','Bob'];
  femaleFaceNames = ['Ava','Sara','Anne']

  maleFaceSelectedPngs = ['face/male/face-1.png','face/male/face-2.png','face/male/face-3.png']
  maleFaceDeselectedPngs = ['face/male/face-1.png','face/male/face-2.png','face/male/face-3.png']

  // The index of the selected face
  selectedFaceIndex: number | null = null;

  skinColors: string[] = ['#E98C7B', '#F4BCA4', '#FFB784', '#F3A396', '#B2674B'];
  topColors: string[] = ['#78A9FF','#EF5DA8','#F3BB9D','#EDF5FF','#202020', '#A7F0BA'];
  pantColors: string[] = ['#001D6C','#022D0D','#001141'];
  hairColors: string[] = ['#3E1A00','#000000','#E94B36'];
  shoeColors: string[] = ['#A6C8FF','#6FDC8C','#D9D1C7', '#001141'];



  selectedFace1: any[] = [];
  selectedFace: string = '';
  selectedPosture: string = '';

  @Output() faceSelected = new EventEmitter<string[]>();
  @Output() skinColorSelected = new EventEmitter<string[]>();
  @Output() postureSelected = new EventEmitter<string>();
  @Output() genderSelected = new EventEmitter<string>();




  constructor(
    private svgService: SvgService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef

  ) {}

  async ngOnInit() {
    await this.loadSvgSets(this.femaleFaceSvgPaths, this.femaleFaceSvgs);
    await this.loadSvgSets(this.maleFaceSvgPaths, this.maleFaceSvgs);

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
      case "hair":
        this.onColorChangeAssets.push('hair',color);
        this.selectedHairColor = color;
        break;
      case "shoe":
          this.onColorChangeAssets.push('shoe',color);
          this.selectedShoeColor = color;

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
  
    // if(this.isGenderSelected('male') ) {
    //   const selectedCharacter = 'bob';
    //     const svgPath = this.femaleFaceSvgPaths[3];
    //     const svgContent = await this.fetchSvgContent(svgPath);
    //     this.selectedFace1 = [svgContent,selectedCharacter];
    //     this.selectedFace = svgContent; // If using string, otherwise use SafeHtml as discussed earlier.
       
    //     const emitCopy = [...this.selectedFace1];
    //     console.log('Emitting:', emitCopy);
    //     this.faceSelected.emit(emitCopy);
    //     console.log('Emitted:', emitCopy);
    // }
  
    // Fetch the corresponding SVG content for the selected face

    if(index == 0) {
      if(this.isGenderSelected('female')) {
        const selectedCharacter = 'ava';
        const svgPath = this.femaleFaceSvgPaths[index];
        const svgContent = await this.fetchSvgContent(svgPath);
        this.selectedFace1 = [svgContent,selectedCharacter];
        this.selectedFace = svgContent; // If using string, otherwise use SafeHtml as discussed earlier.
       
        const emitCopy = [...this.selectedFace1];
        console.log('Emitting:', emitCopy);
        this.faceSelected.emit(emitCopy);
        console.log('Emitted:', emitCopy);
      }
      else {
        const selectedCharacter = 'tim';
        const svgPath = this.maleFaceSvgPaths[index];
        const svgContent = await this.fetchSvgContent(svgPath);
        this.selectedFace1 = [svgContent,selectedCharacter];
        const emitCopy = [...this.selectedFace1];
        console.log('Emitting:', emitCopy);
        this.faceSelected.emit(emitCopy);
        console.log('Emitted:', emitCopy);
      }
      
    }
    else if(index == 1) {
      if(this.isGenderSelected('female')) {
        const selectedCharacter = 'sara';
        const svgPath = this.femaleFaceSvgPaths[index];
        const svgContent = await this.fetchSvgContent(svgPath);
        this.selectedFace1 = [svgContent,selectedCharacter];
        this.selectedFace = svgContent; 
  
        const emitCopy = [...this.selectedFace1];
        console.log('Emitting:', emitCopy);
        this.faceSelected.emit(emitCopy);
        console.log('Emitted:', emitCopy);
      }
      else {
        const selectedCharacter = 'adam';
        const svgPath = this.maleFaceSvgPaths[index];
        const svgContent = await this.fetchSvgContent(svgPath);
        this.selectedFace1 = [svgContent,selectedCharacter];
        const emitCopy = [...this.selectedFace1];
        console.log('Emitting:', emitCopy);
        this.faceSelected.emit(emitCopy);
        console.log('Emitted:', emitCopy);
      }  
    }
    else if(index ==2) {
      if(this.isGenderSelected('female')) {
        const selectedCharacter = 'jenna';
        const svgPath = this.femaleFaceSvgPaths[index];
        const svgContent = await this.fetchSvgContent(svgPath);
        this.selectedFace1 = [svgContent,selectedCharacter];
        this.selectedFace = svgContent; 
  
        const emitCopy = [...this.selectedFace1];
        console.log('Emitting:', emitCopy);
        this.faceSelected.emit(emitCopy);
        console.log('Emitted:', emitCopy);
      }
      else {
        const selectedCharacter = 'jimmy';
        const svgPath = this.maleFaceSvgPaths[index];
        const svgContent = await this.fetchSvgContent(svgPath);
        this.selectedFace1 = [svgContent,selectedCharacter];
        const emitCopy = [...this.selectedFace1];
        console.log('Emitting:', emitCopy);
        this.faceSelected.emit(emitCopy);
        console.log('Emitted:', emitCopy);
      }
    }
    else if(index ==3) {
      const selectedCharacter = 'rohan';
      const svgPath = this.maleFaceSvgPaths[index];
        const svgContent = await this.fetchSvgContent(svgPath);
      this.selectedFace1 = [svgContent,selectedCharacter];
      const emitCopy = [...this.selectedFace1];
      console.log('Emitting:', emitCopy);
      this.faceSelected.emit(emitCopy);
      console.log('Emitted:', emitCopy);
    }
    else {
      const selectedCharacter = 'bob';
      const svgPath = this.maleFaceSvgPaths[index];
      const svgContent = await this.fetchSvgContent(svgPath);
      this.selectedFace1 = [svgContent,selectedCharacter];
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
    this.selectedFaceIndex = null;
    this.standingSelected = true;
    this.walkingSelected = false;
    this.sitingSelected = false;
    this.selectedPosture = 'standing';
    this.genderSelected.emit(this.selectedGender);
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

  copySVGToClipboard() {
    const svgElement = document.getElementById('svg-container')?.innerHTML;
    if (!svgElement) return;
  
    // Use navigator.clipboard to copy the SVG content to the clipboard
    const sanitizedSvg = svgElement.replace(/(\r\n|\n|\r)/gm, "").trim();
    
    // Ensure the browser supports clipboard API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(sanitizedSvg).then(() => {
        console.log('SVG copied to clipboard');
        this.showCopyNotification();
      }).catch((err) => {
        console.error('Failed to copy SVG: ', err);
      });
    } else {
      console.error('Clipboard API not supported');
    }
  }
  showCopyNotification() {
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 2000); // Hide after 2 seconds
  }

  private downloadFile(url: string, filename: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

}
