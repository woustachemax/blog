import { GridBackground } from "./components/GridBackground";
import { Hero } from "./components/Hero";
import { RecentBlogs } from "./components/RecentBlogs";
import { SiteFooter } from "./components/SiteFooter";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-12 space-y-14 sm:space-y-20 overflow-x-hidden">
      <GridBackground />
      <Hero />
      <RecentBlogs />
      <SiteFooter />
    </div>
  );
}
