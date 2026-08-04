import HolyNavbar from "./components/holy/HolyNavbar"
import HolyHero from "./components/holy/HolyHero"
import HolyGames from "./components/holy/HolyGames"
import HolyPricing from "./components/holy/HolyPricing"
import HolyFeatures from "./components/holy/HolyFeatures"
import HolyPanel from "./components/holy/HolyPanel"
import HolyReviews from "./components/holy/HolyReviews"
import HolyLocations from "./components/holy/HolyLocations"
import HolyHardware from "./components/holy/HolyHardware"
import HolyFAQ from "./components/holy/HolyFAQ"
import HolyCTA from "./components/holy/HolyCTA"
import HolyFooter from "./components/holy/HolyFooter"

export default function Home() {
  return (
    <div className="min-h-screen bg-black transition-colors duration-300">
      <HolyNavbar />
      <HolyHero />
      <HolyGames />
      <HolyPricing />
      <HolyFeatures />
      <HolyPanel />
      <HolyReviews />
      <HolyLocations />
      <HolyHardware />
      <HolyFAQ />
      <HolyCTA />
      <HolyFooter />
    </div>
  )
}