import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import ProductPage from '../pages/ProductPage';

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve(
      new Response(
        JSON.stringify([
          { uuid: '1', name: 'Alpha', price: 10, description: 'desc', productImage: '', category: '' },
        ]),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    )
  );
});

describe('ProductPage', () => {
  it('renders product details', async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );
    expect(await screen.findByText('Alpha')).toBeTruthy();
    expect(screen.getByText('$10.00')).toBeTruthy();
    expect(screen.getByText('desc')).toBeTruthy();
  });

  it('shows not found for invalid id', async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/product/999']}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );
    expect(await screen.findByText(/not found/i)).toBeTruthy();
  });
});