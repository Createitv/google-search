import AdvancedGoogleSearch from "@/components/advanced-searh";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      <section className="min-w-5xl">
        <AdvancedGoogleSearch></AdvancedGoogleSearch>
      </section>
      {/* <section>
        <WebsiteDirectory></WebsiteDirectory>
      </section> */}
    </main>
  );
}
