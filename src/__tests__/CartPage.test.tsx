import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CartPage from '../pages/CartPage';

const clearMock = vi.fn();

vi.mock('../context/CartContext', () => ({
  useCart: () => ({
    items: [
      {
        product: {
          uuid: '1',
          name: 'Alpha',
          price: 10,
          description: '',
          productImage: '',
          category: '',
        },
        quantity: 2,
      },
    ],
    increment: vi.fn(),
    decrement: vi.fn(),
    remove: vi.fn(),
    total: 20,
    clear: clearMock,
  }),
}));

beforeEach(() => {
  clearMock.mockClear();
  cleanup();
});

describe('CartPage', () => {
  it('renders cart items and total', () => {
    render(<CartPage />);
    expect(screen.getByText('Alpha')).toBeTruthy();
    
    expect(screen.getByText('$10.00')).toBeTruthy();
    expect(screen.getByText(/Total: \$20\.00/i)).toBeTruthy();
  });

  it('shows empty message when cart is empty', async () => {
    vi.doMock('../context/CartContext', () => ({
        useCart: () => ({
        items: [],
        increment: vi.fn(),
        decrement: vi.fn(),
        remove: vi.fn(),
        total: 0,
        clear: vi.fn(),
        }),
    }));

    vi.resetModules();
    const { default: CartPageEmpty } = await import('../pages/CartPage');

    render(<CartPageEmpty />);
    expect(screen.getByText(/cart is empty/i)).toBeTruthy();
   });

  it('calls clear on button click', () => {
    render(<CartPage />);
    const clearBtns = screen.getAllByText(/clear cart/i);
    fireEvent.click(clearBtns[0]);
    expect(clearMock).toHaveBeenCalled();
  });
});