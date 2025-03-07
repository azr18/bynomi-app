// tests/unit/utils/addressValidator.test.js
import {
  isValidAddress,
  isValidPostalCode,
  formatAddress,
  getRequiredFields
} from '../../../lib/utils/addressValidator';

describe('Address Validator', () => {
  describe('isValidAddress', () => {
    it('should return true for a complete and valid address', () => {
      const address = {
        first_name: 'John',
        last_name: 'Doe',
        address_line1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US',
        phone: '212-555-1234'
      };
      
      expect(isValidAddress(address)).toBe(true);
    });
    
    it('should return false when required fields are missing', () => {
      const address = {
        first_name: 'John',
        last_name: 'Doe',
        // Missing address_line1
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US',
        phone: '212-555-1234'
      };
      
      expect(isValidAddress(address)).toBe(false);
    });
    
    it('should return false when postal code is invalid for the country', () => {
      const address = {
        first_name: 'John',
        last_name: 'Doe',
        address_line1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postal_code: 'INVALID',
        country: 'US',
        phone: '212-555-1234'
      };
      
      expect(isValidAddress(address)).toBe(false);
    });
  });
  
  describe('isValidPostalCode', () => {
    it('should validate US postal codes correctly', () => {
      expect(isValidPostalCode('10001', 'US')).toBe(true);
      expect(isValidPostalCode('90210', 'US')).toBe(true);
      expect(isValidPostalCode('12345-6789', 'US')).toBe(true);
      expect(isValidPostalCode('ABCDE', 'US')).toBe(false);
      expect(isValidPostalCode('1234', 'US')).toBe(false);
    });
    
    it('should validate Canadian postal codes correctly', () => {
      expect(isValidPostalCode('A1A 1A1', 'CA')).toBe(true);
      expect(isValidPostalCode('M5V 2H1', 'CA')).toBe(true);
      expect(isValidPostalCode('12345', 'CA')).toBe(false);
    });
    
    it('should validate UK postal codes correctly', () => {
      expect(isValidPostalCode('SW1A 1AA', 'GB')).toBe(true);
      expect(isValidPostalCode('M1 1AA', 'GB')).toBe(true);
      expect(isValidPostalCode('12345', 'GB')).toBe(false);
    });
    
    it('should return true for countries without specific postal code validation', () => {
      expect(isValidPostalCode('12345', 'ZZ')).toBe(true);
    });
  });
  
  describe('formatAddress', () => {
    it('should format address for display correctly', () => {
      const address = {
        first_name: 'John',
        last_name: 'Doe',
        address_line1: '123 Main St',
        address_line2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US'
      };
      
      const formatted = formatAddress(address);
      expect(formatted).toEqual(
        'John Doe\n123 Main St\nApt 4B\nNew York, NY 10001\nUnited States'
      );
    });
    
    it('should handle missing optional fields', () => {
      const address = {
        first_name: 'John',
        last_name: 'Doe',
        address_line1: '123 Main St',
        // No address_line2
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US'
      };
      
      const formatted = formatAddress(address);
      expect(formatted).toEqual(
        'John Doe\n123 Main St\nNew York, NY 10001\nUnited States'
      );
    });
  });
  
  describe('getRequiredFields', () => {
    it('should return the correct set of required fields for US', () => {
      const fields = getRequiredFields('US');
      expect(fields).toContain('first_name');
      expect(fields).toContain('last_name');
      expect(fields).toContain('address_line1');
      expect(fields).toContain('city');
      expect(fields).toContain('state');
      expect(fields).toContain('postal_code');
      expect(fields).toContain('country');
      expect(fields).toContain('phone');
    });
    
    it('should handle different country requirements', () => {
      const fields = getRequiredFields('IT');
      expect(fields).toContain('first_name');
      expect(fields).toContain('last_name');
      expect(fields).toContain('address_line1');
      expect(fields).toContain('city');
      expect(fields).toContain('postal_code');
      expect(fields).toContain('country');
      // Some countries don't require state/province
      expect(fields).not.toContain('state');
    });
  });
});