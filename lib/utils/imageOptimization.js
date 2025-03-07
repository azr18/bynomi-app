// lib/utils/imageOptimization.js

/**
 * Generates responsive image sources for different viewport sizes
 * @param {string} src - The original image source
 * @param {Object} options - Configuration options
 * @param {Array<number>} options.widths - Array of widths to generate sources for
 * @param {string} options.format - Image format (webp, jpeg, etc.)
 * @returns {Array} - Array of image sources with srcSet and sizes
 */
export function generateResponsiveImageSources(src, options = {}) {
  const defaultOptions = {
    widths: [640, 750, 828, 1080, 1200, 1920],
    format: 'webp',
  };
  
  const { widths, format } = { ...defaultOptions, ...options };
  
  // Parse the image path to separate path from extension
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDotIndex);
  
  // Generate srcSet for each width
  const srcSet = widths
    .map(width => {
      const optimizedSrc = `${basePath}-${width}.${format}`;
      return `${optimizedSrc} ${width}w`;
    })
    .join(', ');
  
  // Generate sizes attribute
  const sizes = [
    '(max-width: 640px) 100vw',
    '(max-width: 768px) 50vw',
    '(max-width: 1024px) 33vw',
    '25vw'
  ].join(', ');
  
  return {
    srcSet,
    sizes,
    type: `image/${format}`
  };
}

/**
 * Generates placeholder blur data URL for images
 * This is a simplified version for demonstration purposes
 * In a real implementation, this would generate actual blur data
 * @param {string} src - Image source
 * @returns {string} - Data URL for placeholder
 */
export function generatePlaceholderBlur(src) {
  // In a real implementation, this would generate a tiny base64 placeholder
  // For demo purposes, we return a light gray data URL
  return 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
}

/**
 * Prioritizes critical images for preloading
 * @param {Array<string>} imagePaths - Array of image paths
 * @returns {Array<string>} - Array of critical images to preload
 */
export function prioritizeCriticalImages(imagePaths) {
  // In a real implementation, this would identify critical images
  // For demo purposes, we assume the first 2 images are critical
  return imagePaths.slice(0, 2);
}

/**
 * Determines if an image should be lazy loaded based on its position
 * @param {number} index - Index of the image in the list
 * @param {Object} options - Configuration options
 * @param {number} options.lazyLoadThreshold - Threshold for lazy loading (default: 2)
 * @returns {boolean} - Whether the image should be lazy loaded
 */
export function shouldLazyLoad(index, options = {}) {
  const { lazyLoadThreshold = 2 } = options;
  return index >= lazyLoadThreshold;
}

/**
 * Calculates the aspect ratio for an image
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {number} - Aspect ratio as a decimal
 */
export function calculateAspectRatio(width, height) {
  return height / width;
}

/**
 * Gets dimensions for different image sizes
 * @param {number} originalWidth - Original image width
 * @param {number} originalHeight - Original image height
 * @param {Array<number>} targetWidths - Target widths
 * @returns {Array<Object>} - Array of dimension objects
 */
export function getResponsiveDimensions(originalWidth, originalHeight, targetWidths) {
  const aspectRatio = calculateAspectRatio(originalWidth, originalHeight);
  
  return targetWidths.map(width => {
    const height = Math.round(width * aspectRatio);
    return { width, height };
  });
}

/**
 * Formats an image URL for the image optimization service
 * @param {string} src - Original image source
 * @param {Object} options - Image transformation options
 * @param {number} options.width - Target width
 * @param {number} options.height - Target height
 * @param {string} options.format - Target format
 * @param {string} options.quality - Image quality
 * @returns {string} - Optimized image URL
 */
export function formatOptimizedImageUrl(src, options = {}) {
  // This is a simplified example assuming a hypothetical image service
  // In a real implementation, this would format URLs for services like Imgix, Cloudinary, etc.
  
  const { width, height, format = 'webp', quality = 80 } = options;
  
  // Create a URL object for easier manipulation
  let imageUrl = new URL(src, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  
  // Add optimization parameters
  imageUrl.searchParams.append('w', width);
  if (height) imageUrl.searchParams.append('h', height);
  imageUrl.searchParams.append('fmt', format);
  imageUrl.searchParams.append('q', quality);
  
  return imageUrl.toString();
}