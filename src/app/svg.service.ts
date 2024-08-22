import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available throughout the app
})
export class SvgService {

  constructor() { }

  // Method to load SVG file
  loadSvg(filePath: string): Promise<string> {
    return fetch(filePath) // Fetch the SVG file
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Return the SVG content as text
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error for handling later
      });
  }
}
