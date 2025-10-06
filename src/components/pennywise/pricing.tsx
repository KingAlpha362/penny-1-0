import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with personal finance tracking",
    features: [
      "Connect up to 2 bank accounts",
      "Basic expense tracking",
      "Monthly spending reports",
      "Simple budgeting tools",
      "Limited transaction history",
    ],
    cta: "Get Started",
    mostPopular: false,
  },
  {
    name: "Pro",
    price: "$9.99/month",
    description: "Advanced features for serious financial planning",
    features: [
      "Unlimited bank accounts",
      "Real-time investment tracking",
      "AI-powered insights",
      "Credit score monitoring",
      "Advanced analytics",
      "Custom categories",
      "Unlimited history",
      "Priority support",
    ],
    cta: "Start Free Trial",
    mostPopular: true,
  },
  {
    name: "Family",
    price: "$14.99/month",
    description: "Manage finances for the whole family",
    features: [
      "Everything in Pro",
      "Up to 5 family members",
      "Shared accounts",
      "Family budgeting",
      "Bill splitting",
      "Teen accounts",
      "Spending allowances",
      "Family financial goals",
    ],
    cta: "Start Free Trial",
    mostPopular: false,
  },
];

interface PricingCardProps {
  tier: typeof tiers[number];
}

function PricingCard({ tier }: PricingCardProps) {
  return (
    <Card className={`p-6 ${
      tier.mostPopular ? 'ring-2 ring-primary relative' : ''
    }`}>
      {tier.mostPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">{tier.name}</h3>
        <div className="mt-2">
          <span className="text-4xl font-bold">{tier.price}</span>
          {tier.price !== "$0" && (
            <span className="text-muted-foreground">/month</span>
          )}
        </div>
        <p className="mt-3 text-muted-foreground">{tier.description}</p>
      </div>

      <div className="space-y-3 mb-6">
        {tier.features.map((feature) => (
          <div key={feature} className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button className="w-full" variant={tier.mostPopular ? "default" : "outline"}>
        {tier.cta}
      </Button>
    </Card>
  );
}

export function Pricing() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that works best for you
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </div>
  );
}