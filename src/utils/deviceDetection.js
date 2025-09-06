/**
 * Utility functions for device detection
 */

/**
 * Detects if the current device is running Android
 * @returns {boolean} True if the device is Android, false otherwise
 */
export const isAndroidDevice = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }
  
  return /Android/i.test(navigator.userAgent);
};