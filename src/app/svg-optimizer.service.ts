import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgOptimizerService {
  async optimize(svgContent: string): Promise<string> {
    try {
      // Dynamically import 'svgo' to ensure compatibility with Angular's ESM build
      const { optimize } = await import('svgo');
      
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
        return result.data; // Return the optimized SVG data
      } else {
        throw new Error('Optimization did not produce any data.');
      }
    } catch (error) {
      throw new Error(`SVG Optimization failed: ${error}`);
    }
  }
}