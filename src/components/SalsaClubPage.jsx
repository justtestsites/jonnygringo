import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Check, Clock, Package, Star, Truck, Flame, Calendar, UserCheck, ChevronDown } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx'
import logo from '../assets/logo.png'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const SalsaClubPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const membershipPlans = [
    {
      id: 'mix-match-biweekly',
      name: 'Jonny Gringo Salsa (Mix and Match)',
      frequency: 'Bi-Weekly',
      description: 'Choose your own combination of mild and spicy salsas delivered every 2 weeks',
      price: 35.99,
      savings: 'Save 15%',
      features: [
        'Choose your own mix of mild and spicy',
        'Delivery every 2 weeks',
        'Free local delivery',
        'Cancel anytime'
      ],
      popular: true
    },
    {
      id: 'mild-spicy-monthly',
      name: 'Jonny Gringo Salsa (1 Mild and 1 Spicy)',
      frequency: 'Monthly',
      description: 'Perfect balance with one mild and one spicy salsa delivered monthly',
      price: 19.99,
      savings: 'Save 10%',
      features: [
        '1 Mild + 1 Spicy salsa',
        'Monthly delivery',
        'Free local delivery',
        'Cancel anytime'
      ],
      popular: false
    },
    {
      id: 'mild-2-biweekly',
      name: 'Jonny Gringo Salsa (2 Mild)',
      frequency: 'Bi-Weekly',
      description: 'Double the mild goodness with 2 mild salsas every 2 weeks',
      price: 35.99,
      savings: 'Save 12%',
      features: [
        '2 Mild salsas',
        'Delivery every 2 weeks',
        'Free local delivery',
        'Cancel anytime'
      ],
      popular: false
    },
    {
      id: 'spicy-2-biweekly',
      name: 'Jonny Gringo Salsa (2 Spicy)',
      frequency: 'Bi-Weekly',
      description: 'Turn up the heat with 2 spicy salsas delivered every 2 weeks',
      price: 35.99,
      savings: 'Save 12%',
      features: [
        '2 Spicy salsas',
        'Delivery every 2 weeks',
        'Free local delivery',
        'Cancel anytime'
      ],
      popular: false
    },
    {
      id: 'mild-2-monthly',
      name: 'Jonny Gringo Salsa (2 Mild)',
      frequency: 'Monthly',
      description: 'Enjoy 2 mild salsas delivered to your door every month',
      price: 19.99,
      savings: 'Save 8%',
      features: [
        '2 Mild salsas',
        'Monthly delivery',
        'Free local delivery',
        'Cancel anytime'
      ],
      popular: false
    },
    {
      id: 'spicy-2-monthly',
      name: 'Jonny Gringo Salsa (2 Spicy)',
      frequency: 'Monthly',
      description: 'Keep the heat coming with 2 spicy salsas every month',
      price: 19.99,
      savings: 'Save 8%',
      features: [
        '2 Spicy salsas',
        'Monthly delivery',
        'Free local delivery',
        'Cancel anytime'
      ],
      popular: false
    }
  ]

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId)
  }

  const handleSubscribe = async (plan) => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId: plan.id }),
      });
      const data = await response.json();
      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert(data.error || 'Failed to start checkout.');
      }
    } catch (err) {
      alert('Error connecting to payment gateway.');
    }
  }

  // Benefits for the benefits section
  const benefits = [
    {
      icon: <Truck className="h-7 w-7 text-primary" />, title: 'Convenient Delivery', desc: 'Get your favorite salsas delivered right to your door on a schedule that works for you.'
    },
    {
      icon: <Star className="h-7 w-7 text-primary" />, title: 'Premium Quality', desc: 'Every salsa is crafted with premium ingredients and authentic recipes.'
    },
    {
      icon: <Clock className="h-7 w-7 text-primary" />, title: 'Flexible Plans', desc: 'Choose from bi-weekly or monthly deliveries and cancel anytime with no commitment.'
    }
  ]

  // How it works steps
  const steps = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Choose Your Plan',
      desc: 'Select a bi-weekly or monthly plan that fits your salsa cravings.'
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: 'We Deliver to You',
      desc: 'Your salsas are delivered fresh to your door on your schedule.'
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: 'Enjoy Fresh Salsa',
      desc: 'Open, taste, and enjoy premium salsa at home!'
    }
  ]

  const priceIdMap = {
    'mix-match-biweekly': import.meta.env.VITE_STRIPE_PRICE_ID_MIX_MATCH_BIWEEKLY,
    'mild-spicy-monthly': import.meta.env.VITE_STRIPE_PRICE_ID_MILD_SPICY_MONTHLY,
    'mild-2-biweekly': import.meta.env.VITE_STRIPE_PRICE_ID_MILD_2_BIWEEKLY,
    'spicy-2-biweekly': import.meta.env.VITE_STRIPE_PRICE_ID_SPICY_2_BIWEEKLY,
    'mild-2-monthly': import.meta.env.VITE_STRIPE_PRICE_ID_MILD_2_MONTHLY,
    'spicy-2-monthly': import.meta.env.VITE_STRIPE_PRICE_ID_SPICY_2_MONTHLY,
  };

  return (
    <div className="bg-gradient-to-b from-[#fff7f3] to-[#ffe5e0] min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 drop-shadow-sm">Salsa Club Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">Join the Jonny Gringo Salsa Club and never run out of your favorite salsas! Choose from our flexible Salsa Club subscription plans and get premium salsas delivered right to your door.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-5 w-5 text-secondary" />
            <span>Free Local Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5 text-secondary" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="h-5 w-5 text-secondary" />
            <span>Premium Quality</span>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">Bi-Weekly Plans</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12 h-full">
          {membershipPlans.filter(plan => plan.frequency === 'Bi-Weekly').map((plan) => (
            <Card 
              key={plan.id} 
              className={`jonny-card relative cursor-pointer transition-all duration-300 flex flex-col h-full hover:scale-[1.025] hover:shadow-xl ${
                selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
              } ${plan.popular ? 'bg-white/90 shadow-lg' : 'bg-white/80'}`}
              style={{ minHeight: '100%' }}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-base shadow-md">Most Popular</Badge>
                </div>
              )}
              <CardHeader className={`text-center pb-4 ${plan.popular ? 'pt-8' : ''} px-4 pt-6`}>
                <div className="w-full flex justify-center mb-4">
                  <img src={logo} alt="Jonny Gringo Logo" className="w-36 h-36 object-contain" />
                </div>
                <CardTitle className="text-lg font-bold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">{plan.name}</CardTitle>
                <CardDescription className="mb-4 min-h-[48px] flex items-center justify-center">
                  <span className="block w-full px-3 py-2 rounded-md bg-muted/60 text-base font-medium text-primary/90 border border-primary/10 shadow-sm">
                    {plan.description}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between pb-6 px-4">
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <div className="text-center mb-2">
                    <div className="text-3xl font-bold text-primary mb-1">
                      ${plan.price}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 font-bold">
                      {plan.frequency.toLowerCase()} delivery
                    </div>
                    {/* <Badge variant="outline" className="text-secondary border-secondary">
                      {plan.savings}
                    </Badge> */}
                  </div>
                  <Button 
                    className={`w-full mt-2 ${
                      plan.popular 
                        ? 'jonny-button-primary' 
                        : 'jonny-button-secondary'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSubscribe(plan)
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4 text-center">Monthly Plans</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16 h-full">
          {membershipPlans.filter(plan => plan.frequency === 'Monthly').map((plan) => (
            <Card 
              key={plan.id} 
              className={`jonny-card relative cursor-pointer transition-all duration-300 flex flex-col h-full hover:scale-[1.025] hover:shadow-xl ${
                selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
              } ${plan.popular ? 'bg-white/90 shadow-lg' : 'bg-white/80'}`}
              style={{ minHeight: '100%' }}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-base shadow-md">Most Popular</Badge>
                </div>
              )}
              <CardHeader className={`text-center pb-4 ${plan.popular ? 'pt-8' : ''} px-4 pt-6`}>
                <div className="w-full flex justify-center mb-4">
                  <img src={logo} alt="Jonny Gringo Logo" className="w-24 h-24 object-contain" />
                </div>
                <CardTitle className="text-lg font-bold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">{plan.name}</CardTitle>
                <CardDescription className="mb-4 min-h-[48px] flex items-center justify-center">
                  <span className="block w-full px-3 py-2 rounded-md bg-muted/60 text-base font-medium text-primary/90 border border-primary/10 shadow-sm">
                    {plan.description}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between pb-6 px-4">
                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <div className="text-center mb-2">
                    <div className="text-3xl font-bold text-primary mb-1">
                      ${plan.price}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2 font-bold">
                      {plan.frequency.toLowerCase()} delivery
                    </div>
                    {/* <Badge variant="outline" className="text-secondary border-secondary">
                      {plan.savings}
                    </Badge> */}
                  </div>
                  <Button 
                    className={`w-full mt-2 ${
                      plan.popular 
                        ? 'jonny-button-primary' 
                        : 'jonny-button-secondary'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSubscribe(plan)
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/80 py-12 mb-8">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">Why Join Our Salsa Club?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center flex flex-col items-center p-8 rounded-xl shadow-lg bg-white h-full border border-primary/10">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{benefit.title}</h3>
                <p className="text-muted-foreground text-base">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SalsaClubPage

