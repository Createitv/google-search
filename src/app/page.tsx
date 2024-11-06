import AdvancedGoogleSearch from "@/components/advanced-searh";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      <section className="md:w-2/5">
        <AdvancedGoogleSearch></AdvancedGoogleSearch>
      </section>
      {/* <section>
        <WebsiteDirectory></WebsiteDirectory>
      </section> */}
    </main>
  );
}
