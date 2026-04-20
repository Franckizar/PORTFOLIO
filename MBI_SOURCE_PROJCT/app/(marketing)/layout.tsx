// import PortfolioHeader from '@/components/marketing/PortfolioHeader'?
import MarketingFooter from '@/components/auth/Authfooter'
import PortfolioHeader from '@/components/marketing/PortfolioHeader'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <PortfolioHeader />
      {/*
        pt-16 = 64px — matches the fixed header height exactly.
        The header already renders its own <div className="h-16"> spacer,
        so this wrapper just ensures page content starts below it.
      */}
      <main className="pt-16">
        {children}
      </main>
      <MarketingFooter />
    </div>
  )
}