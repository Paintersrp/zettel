import { FC } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

interface PricingTierProps {
  title: string
  price: number | string
  features: string[]
  recommended?: boolean
}

const PricingTier: FC<PricingTierProps> = ({
  title,
  price,
  features,
  recommended = false,
}) => (
  <Card className={`flex flex-col ${recommended ? "border-primary" : ""}`}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {price === "Free" ? (
          <span className="text-3xl font-bold">Free</span>
        ) : (
          <>
            <span className="text-3xl font-bold">${price}</span> / month
          </>
        )}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={recommended ? "default" : "outline"}>
        Choose Plan
      </Button>
    </CardFooter>
  </Card>
)

export const PricingTiers = () => {
  return (
    <section className="w-full max-w-6xl">
      <h2 className="text-3xl font-semibold text-center mb-8">Pricing Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingTier
          title="Free"
          price="Free"
          features={[
            "Up to 100 notes",
            "1 vault",
            "Web access",
            "Basic support",
          ]}
        />
        <PricingTier
          title="Basic"
          price={9.99}
          features={[
            "Unlimited notes",
            "Up to 3 vaults",
            "Web & CLI access",
            "Priority support",
          ]}
          recommended={true}
        />
        <PricingTier
          title="Advanced"
          price={19.99}
          features={[
            "Unlimited notes",
            "Unlimited vaults",
            "Web & CLI access",
            "Premium support",
            "Advanced integrations",
          ]}
        />
      </div>
    </section>
  )
}

export default PricingTiers
