import AdvancedGoogleSearch from "@/components/advanced-searh";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      <section className="w-fit md:w-1/2">
        <AdvancedGoogleSearch></AdvancedGoogleSearch>
      </section>
      {/* <section>
        <WebsiteDirectory></WebsiteDirectory>
      </section> */}
    </main>
  );
}
