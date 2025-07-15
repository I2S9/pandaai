import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { plan, interval } = await request.json();
    
    // Définir les prix selon le plan et l'intervalle
    let unitAmount: number;
    let productName: string;
    
    if (plan === 'free') {
      return NextResponse.json({ error: 'Free plan does not require payment' }, { status: 400 });
    }
    
    if (interval === 'monthly') {
      unitAmount = 700; // 7€ en centimes
      productName = 'PandaAI Premium - Monthly';
    } else {
      unitAmount = 6700; // 67€ en centimes
      productName = 'PandaAI Premium - Yearly';
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
              description: 'PandaAI Premium - AI-powered learning platform',
              images: ['https://pandaai.vercel.app/logo-pandaai.svg'],
            },
            unit_amount: unitAmount,
            recurring: {
              interval: interval === 'monthly' ? 'month' : 'year',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
      metadata: {
        plan,
        interval,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 