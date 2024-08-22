import { Injectable } from '@angular/core';
import { optimize } from 'svgo';

@Injectable({
  providedIn: 'root'
})
export class SvgOptimizerService {
  async optimize(svgContent: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const result = optimize(svgContent, {
          plugins: [
            'removeViewBox',
            'removeEmptyAttrs',
            'cleanupIds',
            'convertStyleToAttrs',
            'removeDoctype',
            'removeEmptyText',
            'removeComments',
            'removeUselessDefs'
          ]
        });

        if ('data' in result) {
          resolve(result.data); // Resolve with the optimized SVG data
        } else {
          reject('Optimization did not produce any data.');
        }
      } catch (error) {
        reject(error); // Reject if there's an error
      }
    });
  }
}
