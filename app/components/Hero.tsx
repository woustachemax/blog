export function Hero() {
    return(
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
    <section id="hero" className="flex flex-col space-y-3 sm:space-y-4 text-left">
    <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 font-serif">
      Welcome to my  <span className="text-green-200">blog! </span>
    </h1>

    <div className="mt-2 mb-2  px-4 py-4 overflow-x-hidden">
    <h1 className="text-4xl sm:text-3xl font-bold text-green-200 font-serif mt-2 mb-2">
      About Me
    </h1>
    <p className="text-gray-400 text-lg tracking-wide text-left ">
      Hi there! I'm{" "}
      <a 
        href="https://siddharththakkar.xyz" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-green-200 hover:underline"
      >
        Siddharth
      </a>
      , a software developer and an avid learner. Over the past few years, I've
      spent my time on the internet, with content, mostly consuming it. Part of
      the reason is that I never thought I could add value by sharing my
      thoughts. However, these past few months, I've been building some really
      cool stuff and learning a lot. I thought it would be a good idea to share
      my learnings and experiences with the world. So, here I am, starting my
      blog. I hope you find something useful here. If you do, please let me know!
      If you have any questions or suggestions, feel free to drop me a mail{" "}
      <a
      href="mailto:sid2011thakkar@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-200 hover:underline"
    >
        here. 
      </a>
    </p>
    </div>
    </section>
    </div>
    


    )
}