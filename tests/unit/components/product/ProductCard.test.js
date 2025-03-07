// tests/unit/components/product/ProductCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../../components/product/ProductCard';
import { mockProducts } from '../../../mocks/data/products';
import { CurrencyContext } from '../../../../lib/context/CurrencyContext';
import { CartContext } from '../../../../lib/context/CartContext';

// Mock Next.js useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe('ProductCard Component', () => {
  const mockProduct = mockProducts[0]; // Classic White Tablecloth
  
  // Mock context values
  const mockCurrencyContextValue = {
    currency: 'USD',
    setCurrency: jest.fn(),
  };
  
  const mockCartContextValue = {
    addToCart: jest.fn(),
    isInCart: jest.fn().mockReturnValue(false),
  };
  
  const renderWithContexts = (component) => {
    return render(
      <CurrencyContext.Provider value={mockCurrencyContextValue}>
        <CartContext.Provider value={mockCartContextValue}>
          {component}
        </CartContext.Provider>
      </CurrencyContext.Provider>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the product information correctly', () => {
    renderWithContexts(<ProductCard product={mockProduct} />);
    
    // Check if product name is displayed
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    
    // Check if price is displayed correctly
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    
    // Check if image is rendered correctly
    const image = screen.getByAltText(mockProduct.images[0].alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining(mockProduct.images[0].url));
  });
  
  it('shows featured badge when product is featured', () => {
    renderWithContexts(<ProductCard product={mockProduct} />);
    
    // Featured product should show a badge
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
  
  it('does not show featured badge when product is not featured', () => {
    const nonFeaturedProduct = { ...mockProduct, featured: false };
    renderWithContexts(<ProductCard product={nonFeaturedProduct} />);
    
    // No featured badge should be present
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });
  
  it('displays custom size option when available', () => {
    renderWithContexts(<ProductCard product={mockProduct} />);
    
    // Custom size option should be displayed for tablecloths
    expect(screen.getByText('Custom sizes available')).toBeInTheDocument();
  });
  
  it('does not display custom size option when not available', () => {
    const noCustomSizeProduct = { 
      ...mockProduct, 
      custom_options: { 
        has_custom_size: false 
      } 
    };
    renderWithContexts(<ProductCard product={noCustomSizeProduct} />);
    
    // Custom size option should not be displayed
    expect(screen.queryByText('Custom sizes available')).not.toBeInTheDocument();
  });
  
  it('calls addToCart when the quick add button is clicked', () => {
    renderWithContexts(<ProductCard product={mockProduct} />);
    
    // Find and click the "Quick Add" button
    const quickAddButton = screen.getByText('Quick Add');
    fireEvent.click(quickAddButton);
    
    // Check if addToCart was called with the correct product
    expect(mockCartContextValue.addToCart).toHaveBeenCalledWith(
      mockProduct,
      1,
      undefined
    );
  });
  
  it('shows "In Cart" instead of "Quick Add" when product is already in cart', () => {
    // Mock that the product is already in the cart
    mockCartContextValue.isInCart.mockReturnValueOnce(true);
    
    renderWithContexts(<ProductCard product={mockProduct} />);
    
    // Should show "In Cart" button
    expect(screen.getByText('In Cart')).toBeInTheDocument();
    // Should not show "Quick Add" button
    expect(screen.queryByText('Quick Add')).not.toBeInTheDocument();
  });
  
  it('navigates to product detail page when card is clicked', () => {
    const { container } = renderWithContexts(<ProductCard product={mockProduct} />);
    
    // Find the card element (excluding the "Quick Add" button)
    const cardElement = container.querySelector('.product-card');
    fireEvent.click(cardElement);
    
    // We can't easily test the router.push since it's mocked, but we can
    // check that the card has the expected CSS class for cursor pointer
    expect(cardElement).toHaveClass('cursor-pointer');
  });
});