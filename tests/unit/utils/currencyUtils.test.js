// tests/unit/utils/currencyUtils.test.js
import {
  formatPrice,
  convertCurrency,
  getAvailableCurrencies,
  getCurrencySymbol
} from '../../../lib/utils/currencyUtils';

describe('Currency Utilities', () => {
  describe('formatPrice', () => {
    it('should format prices in USD correctly', () => {
      expect(formatPrice(49.99, 'USD')).toBe('$49.99');
      expect(formatPrice(1000, 'USD')).toBe('$1,000.00');
      expect(formatPrice(0, 'USD')).toBe('$0.00');
    });
    
    it('should format prices in EUR correctly', () => {
      expect(formatPrice(49.99, 'EUR')).toBe('€49.99');
      expect(formatPrice(1000, 'EUR')).toBe('€1,000.00');
      expect(formatPrice(0, 'EUR')).toBe('€0.00');
    });
    
    it('should format prices in GBP correctly', () => {
      expect(formatPrice(49.99, 'GBP')).toBe('£49.99');
      expect(formatPrice(1000, 'GBP')).toBe('£1,000.00');
      expect(formatPrice(0, 'GBP')).toBe('£0.00');
    });
    
    it('should handle decimal places correctly', () => {
      expect(formatPrice(49.99, 'USD', 0)).toBe('$50');
      expect(formatPrice(49.99, 'USD', 1)).toBe('$50.0');
      expect(formatPrice(49.99, 'USD', 3)).toBe('$49.990');
    });
  });
  
  describe('convertCurrency', () => {
    // Mock exchange rates for testing
    const mockRates = {
      USD: 1.0,
      EUR: 0.85,
      GBP: 0.75,
      CAD: 1.25
    };
    
    beforeEach(() => {
      // Mock the global exchange rates
      global.exchangeRates = mockRates;
    });
    
    it('should convert USD to other currencies correctly', () => {
      // USD to EUR
      expect(convertCurrency(100, 'USD', 'EUR')).toBe(85);
      // USD to GBP
      expect(convertCurrency(100, 'USD', 'GBP')).toBe(75);
      // USD to CAD
      expect(convertCurrency(100, 'USD', 'CAD')).toBe(125);
    });
    
    it('should convert other currencies to USD correctly', () => {
      // EUR to USD
      expect(convertCurrency(85, 'EUR', 'USD')).toBe(100);
      // GBP to USD
      expect(convertCurrency(75, 'GBP', 'USD')).toBe(100);
      // CAD to USD
      expect(convertCurrency(125, 'CAD', 'USD')).toBe(100);
    });
    
    it('should convert between non-USD currencies correctly', () => {
      // EUR to GBP
      expect(convertCurrency(85, 'EUR', 'GBP')).toBe(75);
      // GBP to CAD
      expect(convertCurrency(75, 'GBP', 'CAD')).toBe(125);
    });
    
    it('should return the same amount when source and target currencies are the same', () => {
      expect(convertCurrency(100, 'USD', 'USD')).toBe(100);
      expect(convertCurrency(85, 'EUR', 'EUR')).toBe(85);
    });
    
    it('should handle missing exchange rates gracefully', () => {
      // When source currency rate is missing, returns original amount
      expect(convertCurrency(100, 'JPY', 'USD')).toBe(100);
      // When target currency rate is missing, returns original amount
      expect(convertCurrency(100, 'USD', 'JPY')).toBe(100);
    });
  });
  
  describe('getAvailableCurrencies', () => {
    it('should return an array of available currencies', () => {
      const currencies = getAvailableCurrencies();
      expect(Array.isArray(currencies)).toBe(true);
      expect(currencies.length).toBeGreaterThan(0);
      expect(currencies).toContain('USD');
      expect(currencies).toContain('EUR');
      expect(currencies).toContain('GBP');
    });
  });
  
  describe('getCurrencySymbol', () => {
    it('should return the correct currency symbol for common currencies', () => {
      expect(getCurrencySymbol('USD')).toBe('$');
      expect(getCurrencySymbol('EUR')).toBe('€');
      expect(getCurrencySymbol('GBP')).toBe('£');
      expect(getCurrencySymbol('JPY')).toBe('¥');
    });
    
    it('should return the currency code for uncommon currencies', () => {
      expect(getCurrencySymbol('XYZ')).toBe('XYZ');
    });
    
    it('should handle case insensitivity', () => {
      expect(getCurrencySymbol('usd')).toBe('$');
      expect(getCurrencySymbol('Eur')).toBe('€');
    });
  });
});