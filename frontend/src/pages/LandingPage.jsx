import {
  CategoriesSection,
  FinalCta,
  HeroSection,
  IngredientsSection,
  LandingFooter,
  LandingNav,
  Marquee,
  ProductShowcase,
  RolesSection,
  StatsSection,
  StorySection,
} from '../features/landing/index.js'

export default function LandingPage() {
  return (
    <div className="overflow-x-clip bg-white text-ink">
      <LandingNav />
      <main>
        <HeroSection />
        <Marquee />
        <StorySection />
        <ProductShowcase />
        <CategoriesSection />
        <IngredientsSection />
        <RolesSection />
        <StatsSection />
        <FinalCta />
      </main>
      <LandingFooter />
    </div>
  )
}
