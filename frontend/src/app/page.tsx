import HeroSlider from '@/components/HeroSlider'

export default function Home() {
  return (
    <main className="wrapper-flex-1 overflow-x-hidden">
      <HeroSlider />
      <section className="wrapper">SECTION: Best sellers</section>
      <section className="wrapper">SECTION: Gallery masonry</section>
      <section className="wrapper">SECTION: Newsletter</section>
    </main>
  )
}
