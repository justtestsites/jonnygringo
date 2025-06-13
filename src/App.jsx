import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ShoppingCart, Menu, X, Instagram, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import SalsaClubPage from './components/SalsaClubPage.jsx'
import CartPage from './components/CartPage.jsx'
import './App.css'
import logo from './assets/logo.png'
import salsa1 from './assets/gallery/salsa1.jpg'
import salsa2 from './assets/gallery/salsa2.jpg'
import salsa3 from './assets/gallery/salsa3.jpg'
import mildSalsaWebp from './assets/gallery/mild-salsa.webp'
import spicySalsaWebp from './assets/gallery/spicy-salsa.webp'

export const products = [
  {
    id: "mild-salsa",
    name: "Jonny Gringo Mild Salsa",
    description: "Our signature mild blend featuring fresh tomatoes, onions, and cilantro with just a hint of spice",
    heatLevel: "Mild",
    price: "8.99",
    image: mildSalsaWebp
  },
  {
    id: "spicy-salsa",
    name: "Jonny Gringo Spicy Salsa",
    description: "Our signature spicy blend with fresh serrano peppers and a perfect balance of heat and flavor",
    heatLevel: "Spicy",
    price: "8.99",
    image: spicySalsaWebp
  }
];

const customerReviews = [
  { stars: 5, text: 'The mild salsa is perfect! Just the right amount of fresh cilantro and tomatoes. My whole family loves it on taco night!', name: 'Maria R.' },
  { stars: 5, text: 'Finally found a spicy salsa that delivers real heat without sacrificing flavor. The serrano peppers give it the perfect kick!', name: 'James K.' },
  { stars: 5, text: 'You can really taste the difference with their fresh ingredients. Both mild and spicy are amazing. Best salsa in LA!', name: 'David M.' },
  { stars: 5, text: 'The Salsa Club subscription is a game changer. Fresh salsa delivered to my door every month—love it!', name: 'Samantha T.' },
  { stars: 5, text: 'I brought Jonny Gringo salsa to a party and everyone asked where I got it. The spicy one is my favorite!', name: 'Carlos V.' },
  { stars: 5, text: 'I appreciate the all-natural ingredients. The flavor is so fresh and vibrant. Highly recommend!', name: 'Priya S.' },
  { stars: 5, text: "The guacamole is the best I've had from a store. Pairs perfectly with the mild salsa.", name: 'Ashley L.' },
  { stars: 5, text: 'I love the variety in the Salsa Club. Every delivery is a treat and the quality is always top notch.', name: 'Ben W.' }
];

// Navigation Component
const Navigation = ({ cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">
              Jonny Gringo Salsa
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-black">
              Home
            </Link>
            <Link to="/salsaclub" className="text-foreground hover:text-primary transition-colors font-black">
              Salsa Club
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-black">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-black">
              Contact
            </Link>
            <Button variant="outline" size="sm" className="relative" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {cartItems}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/salsaclub"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Salsa Club
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section Component
const HeroSection = ({ onShopNow }) => {
  const navigate = useNavigate()

  return (
    <section className="jonny-hero py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          {/* Logo fills the hero area */}
          <img 
            src={logo} 
            alt="Jonny Gringo Logo" 
            className="mx-auto"
            style={{ maxWidth: '500px', width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Premium Crafted Salsas
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover our range of crafted salsas, each made with premium ingredients and authentic recipes. 
          From mild to spicy, we have the perfect salsa for every taste.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="jonny-button-primary px-8 py-3 text-lg"
            onClick={onShopNow}
          >
            Shop Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="jonny-button-secondary px-8 py-3 text-lg"
            onClick={() => navigate('/salsaclub')}
          >
            Join Salsa Club
          </Button>
        </div>
      </div>
    </section>
  )
}

// Product Card Component
const ProductCard = ({ id, name, description, heatLevel, price, image, onAddToCart, onRemoveFromCart, quantityInCart }) => {
  const [localQuantity, setLocalQuantity] = useState(1); // For quantity picker before adding to cart

  const handleIncrementLocal = () => {
    setLocalQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrementLocal = () => {
    setLocalQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  const handleAddClick = () => {
    onAddToCart(id, localQuantity);
    setLocalQuantity(1); // Reset local quantity after adding to cart
  };

  const handleIncrementCart = () => {
    onAddToCart(id, 1);
  };

  const handleDecrementCart = () => {
    onRemoveFromCart(id, 1);
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 p-0 border-2 border-orange-500 rounded-xl">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-t-xl">
        {image ? <img src={image} alt={name} className="w-full h-full object-cover object-[center_30%]" /> : <div className="text-gray-400">No Image</div>}
      </div>
      <CardHeader className="text-center pb-2 pt-4">
        <CardTitle className="text-xl font-bold text-primary mb-2 leading-tight">{name}</CardTitle>
        <CardDescription className="text-base text-muted-foreground max-w-md mx-auto mb-3 leading-snug">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center flex-grow justify-between p-4 pt-0">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className={`text-xs px-2 py-1 ${
            heatLevel === 'Mild' ? 'bg-green-100 text-green-700 border-green-300' :
            heatLevel === 'Spicy' ? 'bg-red-100 text-red-700 border-red-300' : ''
          }`}>
            {heatLevel}
          </Badge>
        </div>
        <div className="text-2xl font-bold text-primary mb-4">${price}</div>

        {/* Quantity selector group */}
        {quantityInCart > 0 ? (
          <div className="flex items-center space-x-2 mb-4 justify-center">
            <Button variant="outline" size="icon" onClick={handleDecrementCart} className="h-8 w-8">
              -
            </Button>
            <span className="text-lg font-semibold">{quantityInCart}</span>
            <Button variant="outline" size="icon" onClick={handleIncrementCart} className="h-8 w-8">
              +
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-4 justify-center">
              <Button variant="outline" size="icon" onClick={handleDecrementLocal} className="h-8 w-8">
                -
              </Button>
              <span className="text-lg font-semibold">{localQuantity}</span>
              <Button variant="outline" size="icon" onClick={handleIncrementLocal} className="h-8 w-8">
                +
              </Button>
            </div>
            {/* Add to Cart button */}
            <Button className="jonny-button-primary w-full" onClick={handleAddClick}>Add to Cart</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Products Section Component
const ProductsSection = React.forwardRef((props, ref) => {
  const { cart, onAddToCart, onRemoveFromCart } = props;
  const reviewsToShow = 3;
  const numReviews = customerReviews.length;

  const carouselTrack = React.useMemo(() => {
    if (numReviews === 0) {
      return Array(reviewsToShow * 3).fill(null); // Fallback for no reviews
    }

    // Create a base set of reviews that is at least 'reviewsToShow' long by repeating
    let effectiveCustomerReviews = [...customerReviews];
    while (effectiveCustomerReviews.length < reviewsToShow) {
        effectiveCustomerReviews.push(...customerReviews);
    }

    // Then, create the full track for seamless looping using this effectiveCustomerReviews
    const finalTrack = [];
    // Prepend cloned end parts
    for (let i = 0; i < reviewsToShow; i++) {
        finalTrack.push(effectiveCustomerReviews[effectiveCustomerReviews.length - reviewsToShow + i]);
    }
    // Add original content (or effectively repeated content)
    finalTrack.push(...effectiveCustomerReviews);
    // Append cloned start parts
    for (let i = 0; i < reviewsToShow; i++) {
        finalTrack.push(effectiveCustomerReviews[i]);
    }

    return finalTrack;
  }, [customerReviews, reviewsToShow, numReviews]);

  const initialIndex = reviewsToShow;
  const [currentReviewIndex, setCurrentReviewIndex] = useState(initialIndex);

  const carouselRef = React.useRef(null); // Ref to control transition property

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => prevIndex + 1);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => prevIndex - 1);
  };

  // Effect to handle the seamless looping jump using transitionend
  React.useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    const handleTransitionEnd = () => {
      if (currentReviewIndex >= initialIndex + numReviews) {
        // If we've scrolled to the cloned end, jump back to the real start
        carouselElement.style.transitionDuration = '0ms';
        setCurrentReviewIndex(initialIndex);
        // Re-enable transition after the jump, give it a moment to render
        setTimeout(() => {
          if (carouselElement) carouselElement.style.transitionDuration = '500ms';
        }, 100); // A small delay to ensure the 0ms jump is rendered before re-enabling transition
      } else if (currentReviewIndex < initialIndex) {
        // If we've scrolled to the cloned start, jump forward to the real end of the original content
        carouselElement.style.transitionDuration = '0ms';
        setCurrentReviewIndex(initialIndex + numReviews - 1); // Jump to the last original review
        // Re-enable transition after the jump, give it a moment to render
        setTimeout(() => {
          if (carouselElement) carouselElement.style.transitionDuration = '500ms';
        }, 100); // A small delay
      }
    };

    carouselElement.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      carouselElement.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentReviewIndex, numReviews, initialIndex]);

  // Transform value for the carousel
  const transformValue = `translateX(-${currentReviewIndex * (100 / reviewsToShow)}%)`;

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-center text-primary mb-4 tracking-tight">
            Our Signature Salsas
            <div className="mx-auto mt-2 w-24 h-1 bg-primary rounded-full" />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our range of crafted salsas, each made with premium ingredients and authentic recipes
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              onAddToCart={onAddToCart}
              onRemoveFromCart={onRemoveFromCart}
              quantityInCart={cart[product.id] || 0}
            />
          ))}
        </div>

        {/* Spice Level Guide */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-center text-primary mb-6 tracking-tight">
            Spice Level Guide
            <div className="mx-auto mt-2 w-24 h-1 bg-primary rounded-full" />
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-3xl mx-auto mt-8">
            <div className="flex-1 bg-green-50 rounded-xl shadow p-8 border border-green-200 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-lg duration-200">
              <span className="text-5xl mb-3 text-red-400">🔥</span>
              <h3 className="text-2xl font-bold text-green-900 mb-2 tracking-tight">Mild</h3>
              <p className="text-center text-gray-700 font-medium">Flavorful blend with just a hint of heat. Perfect for those who enjoy fresh taste without intense spiciness.</p>
            </div>
            <div className="flex-1 bg-orange-50 rounded-xl shadow p-8 border border-orange-200 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-lg duration-200">
              <span className="text-5xl mb-3 text-red-500">🔥🔥🔥</span>
              <h3 className="text-2xl font-bold text-orange-900 mb-2 tracking-tight">Spicy</h3>
              <p className="text-center text-gray-700 font-medium">Bold heat that packs a punch. Made with fresh serrano peppers for those who love an extra kick.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Jonny Gringo's Salsa */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-center text-primary mb-6 tracking-tight">
            Why Choose Jonny Gringo's Salsa
            <div className="mx-auto mt-2 w-32 h-1 bg-primary rounded-full" />
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
            <div className="rounded-xl shadow p-8 bg-pink-50 border border-pink-200 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-lg duration-200">
              <span className="text-5xl mb-3 text-green-500">🍃</span>
              <h3 className="text-xl font-bold text-pink-900 mb-2 tracking-tight">All Natural Ingredients</h3>
              <p className="text-center text-gray-700 font-medium">Made with fresh, locally sourced produce and no artificial preservatives</p>
            </div>
            <div className="rounded-xl shadow p-8 bg-yellow-50 border border-yellow-200 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-lg duration-200">
              <span className="text-5xl mb-3 text-yellow-500">🏅</span>
              <h3 className="text-xl font-bold text-yellow-900 mb-2 tracking-tight">Crafted Excellence</h3>
              <p className="text-center text-gray-700 font-medium">Expertly crafted in small batches for exceptional flavor and quality</p>
            </div>
            <div className="rounded-xl shadow p-8 bg-red-50 border border-red-200 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-lg duration-200">
              <span className="text-5xl mb-3 text-red-400">❤️</span>
              <h3 className="text-xl font-bold text-red-900 mb-2 tracking-tight">Fresh Every Day</h3>
              <p className="text-center text-gray-700 font-medium">Made fresh daily in small batches for the best taste and quality</p>
            </div>
          </div>
        </div>

        {/* Salsa Gallery */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-center text-primary mb-2 tracking-tight">
            Our Salsa Gallery
            <div className="mx-auto mt-2 w-32 h-1 bg-primary rounded-full" />
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8">Take a closer look at our handcrafted salsas, made with love and the finest ingredients</p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
            <img src={salsa1} alt="Salsa 1" className="rounded-xl shadow-lg object-cover w-full md:w-1/3 h-64 transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer" />
            <img src={salsa2} alt="Salsa 2" className="rounded-xl shadow-lg object-cover w-full md:w-1/3 h-64 transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer" />
            <img src={salsa3} alt="Salsa 3" className="rounded-xl shadow-lg object-cover w-full md:w-1/3 h-64 transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer" />
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mt-20 mb-20">
          <h2 className="text-3xl font-extrabold text-center text-primary mb-2 tracking-tight">
            What Our Customers Say
            <div className="mx-auto mt-2 w-40 h-1 bg-primary rounded-full" />
          </h2>
          <div className="relative flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md hover:bg-gray-100 opacity-80 hover:opacity-100 transition-opacity"
              onClick={prevReview}
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </Button>
            <div className="w-full max-w-6xl mx-auto overflow-hidden">
              <div
                ref={carouselRef}
                className="flex transition-transform duration-500 ease-in-out gap-8"
                style={{ transform: transformValue }}
              >
                {carouselTrack.map((review, idx) => (
                  <div key={idx} className="flex-shrink-0 w-1/3">
                    {review ? (
                      <div className="rounded-xl shadow p-8 bg-white border border-gray-100 flex flex-col items-start h-full">
                        <div className="flex mb-2 text-yellow-400 text-xl">{'★★★★★'.slice(0, review.stars)}</div>
                        <p className="text-gray-700 font-medium mb-4">"{review.text}"</p>
                        <span className="font-bold text-black">{review.name}</span>
                      </div>
                    ) : (
                      <div className="rounded-xl shadow p-8 bg-white border border-gray-100 flex flex-col items-center justify-center h-full text-gray-300">
                        <p>Empty Slot</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md hover:bg-gray-100 opacity-80 hover:opacity-100 transition-opacity"
              onClick={nextReview}
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
})

// Salsa Club Teaser Component
const SalsaClubTeaser = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-orange-50 py-20 px-4 border-t border-orange-200">
      <div className="max-w-4xl mx-auto text-center rounded-2xl shadow-lg bg-white/80 p-10 border border-orange-100">
        <h2 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">Join the Salsa Club</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Get regular deliveries of your favorite salsas with our Salsa Club plans. Choose from bi-weekly or monthly options and never run out of delicious salsa!</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
          <div className="flex-1 bg-orange-100 rounded-xl p-6 border border-orange-200 flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-orange-900 mb-2">Bi-Weekly</h3>
            <p className="text-gray-700">Fresh salsa every 2 weeks</p>
          </div>
          <div className="flex-1 bg-orange-100 rounded-xl p-6 border border-orange-200 flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-orange-900 mb-2">Monthly</h3>
            <p className="text-gray-700">Monthly salsa delivery</p>
          </div>
          <div className="flex-1 bg-orange-100 rounded-xl p-6 border border-orange-200 flex flex-col items-center">
            <h3 className="text-xl font-bold text-orange-900 mb-2">Mix & Match</h3>
            <p className="text-gray-700">Customize your selection</p>
          </div>
        </div>
        <Button size="lg" className="jonny-button-primary px-10 py-4 text-lg rounded-full shadow-md hover:scale-105 transition-transform" onClick={() => navigate('/salsaclub')}>
          Explore Salsa Club Plans
        </Button>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <>
      <div className="w-full border-t-2 border-gray-200" />
      <footer className="bg-white text-black py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-extrabold mb-4 text-primary">Jonny Gringo Salsa</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Premium crafted salsas made with authentic recipes and the finest ingredients.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-primary">Quick Links</h4>
              <ul className="space-y-3 text-base">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">Home</Link></li>
                <li><Link to="/salsaclub" className="text-muted-foreground hover:text-primary transition-colors duration-200">Salsa Club</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-200">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-primary">Contact</h4>
              <ul className="space-y-3 text-base">
                <li className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  contact@jonnygringo.com
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  (818) 703-2203
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  6263 Topanga Canyon Blvd, Woodland Hills, CA 91367
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-primary">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Instagram className="h-7 w-7" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-black/10 mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Jonny Gringo Salsa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// Home Page Component
const HomePage = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const productsRef = React.useRef(null);
  return (
    <div>
      <HeroSection onShopNow={() => {
        if (productsRef.current) {
          productsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }} />
      <ProductsSection ref={productsRef} cart={cart} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} />
      <SalsaClubTeaser />
    </div>
  )
}

// SalsaClubPage Placeholder
const SalsaClubPagePlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
    <h1 className="text-4xl font-bold text-primary mb-4">Salsa Club</h1>
    <p className="text-lg text-muted-foreground max-w-xl">Details about the Salsa Club subscription will be available here soon. Stay tuned for exciting flavors delivered to your door!</p>
  </div>
);

// About Us Page Component
const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 py-12 px-2">
      <div className="max-w-2xl w-full">
        {/* Main Story Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-red-100 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-4">Our Story</h1>
          <p className="text-lg text-gray-700">
            Discover the passion and dedication behind Jonny Gringo Salsa, where every jar is crafted with love and the finest ingredients.
          </p>
        </div>
        {/* Feature Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-100 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-3xl text-red-500 flex-shrink-0 mt-1 md:mt-0">{/* Heart Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-700 mb-1">Our Flavorful Heritage</h2>
              <p className="text-gray-700">
                Jonny Gringo Salsa is a labor of love that brings people together over great food, flavorful memories, and authentic tradition. Born and raised in Sylmar, California, I grew up surrounded by rich culinary influences, but it was the salsa recipe from my best friend's mom that truly captured my heart. Her homemade salsa, bursting with bold, fresh flavors, became a cherished part of my childhood - one I knew I had to carry forward.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-100 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-3xl text-red-500 flex-shrink-0 mt-1 md:mt-0">{/* Leaf Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 21c.5-4.5 2.5-8 7-8s6.5 3.5 7 8M12 3v8m0 0C7.5 11 5.5 15.5 5 21m7-10c4.5 0 6.5 4.5 7 10" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-700 mb-1">Perfected With Passion</h2>
              <p className="text-gray-700">
                Over the past 20 years, I have refined and perfected that original recipe to make it my own. Each batch of Jonny Gringo Salsa is a reflection of those early memories, blended with my own passion and experience. Using carefully selected ingredients sourced from the best growers on the West Coast, I craft each jar with the freshest tomatoes, peppers, and spices to deliver a salsa that's as vibrant and full of life as the community it was born from.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-100 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-3xl text-red-500 flex-shrink-0 mt-1 md:mt-0">{/* Utensils Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21V7a2 2 0 10-4 0v14m4 0H5m4 0h4m2-14v14m0 0h4m-4 0h-4" /></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-700 mb-1">More Than Just Salsa</h2>
              <p className="text-gray-700">
                Whether you're sharing a meal with family, hosting friends, or just enjoying a quiet moment, Jonny Gringo Salsa is made to enhance any occasion. It's more than just salsa—it's a way to connect, celebrate, and savor the flavors that bring us together.
              </p>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="text-center mt-10">
          <Button size="lg" className="jonny-button-primary px-8 py-3 text-lg" onClick={() => navigate('/contact')}>
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => (
  <div className="max-w-4xl mx-auto py-12 px-4">
    <h1 className="text-5xl font-extrabold text-center text-primary mb-10">Contact Us</h1>

    <div className="grid md:grid-cols-2 gap-8 mb-10">
      <div className="rounded-xl border bg-white shadow-md p-8 flex flex-col items-center text-center">
        <span className="text-3xl mb-2" role="img" aria-label="email">✉️</span>
        <h2 className="text-xl font-bold text-primary mb-2">Email</h2>
        <p className="mb-4 text-foreground">contact@jonnygringo.com</p>
        <a
          href="mailto:contact@jonnygringo.com"
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors"
        >
          Email Us
        </a>
      </div>
      <div className="rounded-xl border bg-white shadow-md p-8 flex flex-col items-center text-center">
        <span className="text-3xl mb-2" role="img" aria-label="phone">📞</span>
        <h2 className="text-xl font-bold text-primary mb-2">Phone</h2>
        <p className="mb-4 text-foreground">(818) 703-2203</p>
        <a
          href="tel:+18187032203"
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors"
        >
          Call Us
        </a>
      </div>
      <div className="rounded-xl border bg-white shadow-md p-8 flex flex-col items-center text-center md:col-span-2">
        <span className="text-3xl mb-2" role="img" aria-label="location">📍</span>
        <h2 className="text-xl font-bold text-primary mb-2">Visit Us</h2>
        <p className="mb-4 text-foreground">6263 Topanga Canyon Blvd, Woodland Hills, CA 91367</p>
        <a
          href="https://www.google.com/maps?q=6263+Topanga+Canyon+Blvd,+Woodland+Hills,+CA+91367"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors"
        >
          Get Directions
        </a>
      </div>
    </div>
    {/* Google Map Embed */}
    <div className="rounded-xl border bg-white shadow-md overflow-hidden">
      <iframe
        title="Jonny Gringo Salsa Location"
        src="https://www.google.com/maps?q=6263+Topanga+Canyon+Blvd,+Woodland+Hills,+CA+91367&output=embed"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
)

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Main App Component
function App() {
  // Initialize cart from localStorage or an empty object
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('jonnyGringoCart');
      return storedCart ? JSON.parse(storedCart) : {};
    } catch (error) {
      console.error("Failed to read cart from localStorage", error);
      return {};
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('jonnyGringoCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to write cart to localStorage", error);
    }
  }, [cart]);

  const handleAddToCart = (productId, quantityToAdd) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + quantityToAdd,
    }));
  };

  const handleRemoveFromCart = (productId, quantityToRemove) => {
    setCart(prevCart => {
      const newQuantity = (prevCart[productId] || 0) - quantityToRemove;
      if (newQuantity <= 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      } else {
        return {
          ...prevCart,
          [productId]: newQuantity,
        };
      }
    });
  };

  // Calculate total cart items for display in the header
  const totalCartItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background">
        <Navigation cartItems={totalCartItems} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              }
            />
            <Route path="/salsaclub" element={<SalsaClubPage />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

