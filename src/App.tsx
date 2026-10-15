/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, ShoeSize, SportCategory, OrderApiResponse } from './types/index.ts';
import { PRODUCTS } from './data/products.ts';
import { BrandIntro } from './components/BrandIntro.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { EditorialStatement } from './components/EditorialStatement.tsx';
import { ThreeWorldsOfMotion } from './components/ThreeWorldsOfMotion.tsx';
import { ProductGrid } from './components/ProductGrid.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { ShowcaseA_Spotlight } from './components/ShowcaseA_Spotlight.tsx';
import { ShowcaseB_Campaign } from './components/ShowcaseB_Campaign.tsx';
import { ShowcaseC_Story } from './components/ShowcaseC_Story.tsx';
import { WhyAnnashop } from './components/WhyAnnashop.tsx';
import { Footer } from './components/Footer.tsx';
import { GoogleSheetsSetupModal } from './components/GoogleSheetsSetupModal.tsx';

const CART_STORAGE_KEY = 'annashop_cart_v1';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccessResponse, setOrderSuccessResponse] = useState<OrderApiResponse | null>(null);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (err) {
      console.error('Lỗi khi đọc giỏ hàng từ localStorage:', err);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    } catch (err) {
      console.error('Lỗi khi lưu giỏ hàng vào localStorage:', err);
    }
  };

  // Add item to cart (merges identical product ID and size)
  const handleAddToCart = (product: Product, size: ShoeSize, quantity: number = 1) => {
    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.selectedSize === size
    );

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      const newQty = Math.min(
        product.stockCount,
        updatedCart[existingIndex].quantity + quantity
      );
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: newQty
      };
    } else {
      updatedCart = [
        ...cart,
        {
          productId: product.id,
          product,
          selectedSize: size,
          quantity
        }
      ];
    }

    updateCartState(updatedCart);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (productId: string, size: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    const updated = cart.map((item) => {
      if (item.productId === productId && item.selectedSize === size) {
        return {
          ...item,
          quantity: Math.min(item.product.stockCount, newQty)
        };
      }
      return item;
    });
    updateCartState(updated);
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string, size: number) => {
    const updated = cart.filter(
      (item) => !(item.productId === productId && item.selectedSize === size)
    );
    updateCartState(updated);
  };

  // Buy Now action: adds to cart and opens checkout directly
  const handleBuyNow = (product: Product, size: ShoeSize, quantity: number) => {
    handleAddToCart(product, size, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Order Success callback
  const handleOrderSuccess = (response: OrderApiResponse) => {
    setIsCheckoutOpen(false);
    setOrderSuccessResponse(response);
    // Clear purchased cart items
    updateCartState([]);
  };

  // Navigation scroll helper
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromHeroOrArena = (category: string) => {
    setActiveCategory(category);
    scrollToCatalog();
  };

  const totalCartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0D0C] text-[#F5F5F0] selection:bg-[#C8FF2F] selection:text-[#0B0D0C]">
      {/* SCENE 01: Brand Intro Entrance */}
      {showIntro && <BrandIntro onComplete={() => setShowIntro(false)} />}

      {/* Primary Top Bar Navigation */}
      <Navbar
        cartItemCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
        onSelectCategory={handleSelectCategoryFromHeroOrArena}
        activeCategory={activeCategory}
      />

      {/* Main Content Sections */}
      <main>
        {/* SCENE 02: Full-Viewport Hero Masterpiece */}
        <Hero
          onExploreClick={scrollToCatalog}
          onFindShoeClick={() => handleSelectCategoryFromHeroOrArena('all')}
          onOpenProduct={(productId) => {
            const p = PRODUCTS.find((item) => item.id === productId);
            if (p) setSelectedProduct(p);
          }}
        />

        {/* SCENE 03: Editorial Brand Statement */}
        <EditorialStatement />

        {/* SCENE 04: The Three Worlds of Motion ("CHOOSE YOUR ARENA") */}
        <ThreeWorldsOfMotion
          onSelectCategory={(cat: SportCategory) => handleSelectCategoryFromHeroOrArena(cat)}
        />

        {/* SCENE 05: Complete Filterable & Searchable Product Catalog */}
        <ProductGrid
          selectedCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onOpenDetails={(p) => setSelectedProduct(p)}
          onQuickAddToCart={(p, size) => handleAddToCart(p, size, 1)}
        />

        {/* SHOWCASE A: Floating Product Spotlight (Engineered for your next move) */}
        <ShowcaseA_Spotlight
          onExploreProduct={(productId) => {
            const p = PRODUCTS.find((item) => item.id === productId);
            if (p) setSelectedProduct(p);
          }}
        />

        {/* SHOWCASE B: Full-Bleed Campaign ("THE GAME NEVER STOPS") */}
        <ShowcaseB_Campaign
          onExploreCampaign={() => {
            setActiveCategory('all');
            scrollToCatalog();
          }}
        />

        {/* SHOWCASE C: Horizontal / Editorial Story (Precision, Control, Freedom) */}
        <ShowcaseC_Story
          onSelectCategory={(cat: SportCategory) => handleSelectCategoryFromHeroOrArena(cat)}
        />

        {/* Section: Why ANNASHOP & Final CTA */}
        <WhyAnnashop onCtaClick={scrollToCatalog} />
      </main>

      {/* Multi-Column Footer */}
      <Footer
        onSelectCategory={handleSelectCategoryFromHeroOrArena}
        onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
      />

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Product Detail Page (PDP) Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, size, qty) => handleAddToCart(p, size, qty)}
        onBuyNow={handleBuyNow}
        onSelectRelated={(p) => setSelectedProduct(p)}
      />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreMore={() => scrollToCatalog()}
      />

      {/* 2-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Confirmation & Receipt Modal */}
      <OrderSuccessModal
        orderResponse={orderSuccessResponse}
        onClose={() => setOrderSuccessResponse(null)}
        onOpenSheetsModal={() => {
          setOrderSuccessResponse(null);
          setIsSheetsModalOpen(true);
        }}
      />

      {/* Google Sheets API Setup & Testing Modal */}
      <GoogleSheetsSetupModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
      />
    </div>
  );
}
