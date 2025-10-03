import { GridBackground } from "./components/GridBackground";
import { Hero } from "./components/Hero";
import { RecentBlogs } from "./components/RecentBlogs";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-20 overflow-x-hidden">
    <GridBackground/>
     <Hero/>
     <RecentBlogs/>
    </div>
  );
}
