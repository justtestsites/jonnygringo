import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { products } from '../App.jsx'; // Assuming products array is exported from App.jsx
import { Trash2, ShoppingCart } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CartPage = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const navigate = useNavigate();

  // Filter out products that are no longer in the cart (quantity 0 or not present)
  const cartItemsDetails = Object.keys(cart)
    .map(productId => {
      const product = products.find(p => p.id === productId);
      if (product && cart[productId] > 0) {
        return { id: product.id, quantity: cart[productId], price: product.price };
      }
      return null;
    })
    .filter(item => item !== null);

  const subtotal = cartItemsDetails.reduce((sum, item) => {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0);

  // For demo, flat shipping (could be dynamic)
  const shipping = cartItemsDetails.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (cartItemsDetails.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cartItemsDetails }),
      });
      const data = await response.json();

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert(data.error || 'Failed to start checkout.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error connecting to payment gateway.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-primary text-center">Your Cart</h1>
      </div>
      {cartItemsDetails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-background border-2 border-dashed border-primary/30 rounded-xl p-14 w-full max-w-[500px] text-center group hover:bg-muted/50 transition duration-500 hover:duration-200">
            <div className="flex justify-center">
              <div className="bg-background size-16 grid place-items-center rounded-xl shadow-lg ring-1 ring-primary/20 group-hover:-translate-y-1 transition duration-500 group-hover:duration-200">
                {/* Removed ShoppingBag icon here as well for consistency */}
              </div>
            </div>
            <h2 className="text-primary font-bold mt-6 text-2xl">Your cart is empty</h2>
            <p className="text-base text-muted-foreground mt-2 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
            </p>
            <Button
              className="jonny-button-primary mt-6 shadow-sm active:shadow-none"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {cartItemsDetails.map(item => (
              <Card key={item.id} className="jonny-card flex flex-col md:flex-row items-center p-0 overflow-hidden border-border hover:border-primary/80 transition-all">
                <div className="flex-shrink-0 h-28 w-28 bg-muted flex items-center justify-center overflow-hidden m-6 rounded-lg">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-6 px-6 py-4">
                  <div className="flex-1 min-w-0 w-full">
                    <h2 className="text-xl font-semibold text-primary mb-2">{item.name}</h2>
                    <p className="text-muted-foreground mb-3">${item.price}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <Button variant="outline" size="icon" onClick={() => onRemoveFromCart(item.id, 1)} className="h-8 w-8">
                        -
                      </Button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => onAddToCart(item.id, 1)} className="h-8 w-8">
                        +
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onRemoveFromCart(item.id, item.quantity)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-primary min-w-[80px] text-right">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                </div>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card className="jonny-card sticky top-4">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pb-0 pt-2">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cartItemsDetails.length} {cartItemsDetails.length === 1 ? 'item' : 'items'})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-primary/20 pt-6 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-6 pb-4">
                <Button
                  className="w-full jonny-button-primary gap-2 text-lg py-3"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 