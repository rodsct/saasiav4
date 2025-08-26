import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function Home() {
  const t = useTranslations()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Personal Agent</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth/signin">
            <Button variant="outline">{t('auth.signIn')}</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>{t('auth.signUp')}</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Your AI-Powered Personal Assistant
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Streamline your workflow, automate tasks, and boost productivity with our intelligent SaaS platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-4">
              Get Started Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Pricing
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">Intelligent Conversations</h3>
            <p className="text-muted-foreground">
              Chat with your AI agent for personalized assistance and task automation.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">Smart Email Management</h3>
            <p className="text-muted-foreground">
              Create and manage dynamic email templates with powerful automation features.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-4">Flexible Subscriptions</h3>
            <p className="text-muted-foreground">
              Choose the plan that fits your needs with Stripe-powered billing integration.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}