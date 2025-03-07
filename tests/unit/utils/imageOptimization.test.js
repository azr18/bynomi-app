// tests/unit/utils/imageOptimization.test.js
import {
  generateResponsiveImageSources,
  generatePlaceholderBlur,
  prioritizeCriticalImages,
  shouldLazyLoad,
  calculateAspectRatio,
  getResponsiveDimensions,
  formatOptimizedImageUrl
} from '../../../lib/utils/imageOptimization';

describe('Image Optimization Utilities', () => {
  describe('generateResponsiveImageSources', () => {
    it('generates srcSet and sizes with default options', () => {
      const src = '/assets/products/image.jpg';
      const result = generateResponsiveImageSources(src);
      
      expect(result.srcSet).toContain('image-640.webp 640w');
      expect(result.srcSet).toContain('image-1920.webp 1920w');
      expect(result.sizes).toContain('(max-width: 640px) 100vw');
      expect(result.type).toBe('image/webp');
    });
    
    it('respects custom options', () => {
      const src = '/assets/products/image.jpg';
      const options = {
        widths: [300, 600, 900],
        format: 'jpeg'
      };
      
      const result = generateResponsiveImageSources(src, options);
      
      expect(result.srcSet).toContain('image-300.jpeg 300w');
      expect(result.srcSet).toContain('image-900.jpeg 900w');
      expect(result.srcSet).not.toContain('image-1920');
      expect(result.type).toBe('image/jpeg');
    });
  });
  
  describe('generatePlaceholderBlur', () => {
    it('returns a data URL', () => {
      const src = '/assets/products/image.jpg';
      const result = generatePlaceholderBlur(src);
      
      expect(result).toMatch(/^data:image\//);
    });
  });
  
  describe('prioritizeCriticalImages', () => {
    it('returns the first two images as critical', () => {
      const images = [
        '/assets/image1.jpg',
        '/assets/image2.jpg',
        '/assets/image3.jpg',
        '/assets/image4.jpg'
      ];
      
      const result = prioritizeCriticalImages(images);
      
      expect(result).toHaveLength(2);
      expect(result).toContain('/assets/image1.jpg');
      expect(result).toContain('/assets/image2.jpg');
      expect(result).not.toContain('/assets/image3.jpg');
    });
    
    it('returns all images if there are fewer than threshold', () => {
      const images = ['/assets/image1.jpg'];
      const result = prioritizeCriticalImages(images);
      
      expect(result).toHaveLength(1);
      expect(result).toContain('/assets/image1.jpg');
    });
  });
  
  describe('shouldLazyLoad', () => {
    it('returns false for images below the threshold', () => {
      expect(shouldLazyLoad(0)).toBe(false);
      expect(shouldLazyLoad(1)).toBe(false);
    });
    
    it('returns true for images at or above the threshold', () => {
      expect(shouldLazyLoad(2)).toBe(true);
      expect(shouldLazyLoad(3)).toBe(true);
    });
    
    it('respects custom threshold', () => {
      expect(shouldLazyLoad(2, { lazyLoadThreshold: 3 })).toBe(false);
      expect(shouldLazyLoad(3, { lazyLoadThreshold: 3 })).toBe(true);
    });
  });
  
  describe('calculateAspectRatio', () => {
    it('calculates aspect ratio correctly', () => {
      expect(calculateAspectRatio(800, 600)).toBe(0.75); // 3:4 ratio
      expect(calculateAspectRatio(1920, 1080)).toBe(0.5625); // 16:9 ratio
      expect(calculateAspectRatio(1000, 1000)).toBe(1); // Square
    });
  });
  
  describe('getResponsiveDimensions', () => {
    it('calculates dimensions while maintaining aspect ratio', () => {
      const originalWidth = 1200;
      const originalHeight = 800;
      const targetWidths = [300, 600, 900];
      
      const results = getResponsiveDimensions(originalWidth, originalHeight, targetWidths);
      
      expect(results).toHaveLength(3);
      
      // Check first size
      expect(results[0].width).toBe(300);
      expect(results[0].height).toBe(200); // 300 * (800/1200)
      
      // Check last size
      expect(results[2].width).toBe(900);
      expect(results[2].height).toBe(600); // 900 * (800/1200)
    });
  });
  
  describe('formatOptimizedImageUrl', () => {
    beforeEach(() => {
      // Mock window.location in Node.js environment
      global.window = { location: { origin: 'https://example.com' } };
    });
    
    afterEach(() => {
      delete global.window;
    });
    
    it('formats URL with width parameter', () => {
      const src = '/assets/products/image.jpg';
      const result = formatOptimizedImageUrl(src, { width: 800 });
      
      expect(result).toContain('w=800');
      expect(result).toContain('fmt=webp');
      expect(result).toContain('q=80');
    });
    
    it('includes all specified parameters', () => {
      const src = '/assets/products/image.jpg';
      const options = {
        width: 800,
        height: 600,
        format: 'jpeg',
        quality: 90
      };
      
      const result = formatOptimizedImageUrl(src, options);
      
      expect(result).toContain('w=800');
      expect(result).toContain('h=600');
      expect(result).toContain('fmt=jpeg');
      expect(result).toContain('q=90');
    });
    
    it('works with absolute URLs', () => {
      const src = 'https://cdn.example.com/assets/products/image.jpg';
      const result = formatOptimizedImageUrl(src, { width: 800 });
      
      expect(result).toContain('https://cdn.example.com');
      expect(result).toContain('w=800');
    });
  });
});