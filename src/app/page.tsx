import Image from "next/image";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
  return (
    <div className="h-dvh bg-site-bg text-site-text flex flex-col items-center px-4 py-4 lg:py-8">
      {/* Site overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-5"
        style={{
          backgroundImage: "url(/overlay.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Main content container */}
      <div className="w-full max-w-[1200px] flex flex-col items-center justify-center flex-1 space-y-4 lg:space-y-6">
        {/* Top section with headline and date info - aligned to video edges */}
        <div className="w-full max-w-[720px] 2xl:max-w-[880px] flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0 text-lg lg:text-xl">
          {/* Left side - headline and graphic */}
          <div>
            <h1>&ldquo;Describe your perfect date...&rdquo;</h1>
            <div className="hidden lg:block mt-8 pl-16">
              <Image
                src="/d1.svg"
                alt="Decorative illustration"
                width={144}
                height={160}
                priority
                sizes="144px"
              />
            </div>
          </div>

          {/* Right side - date details */}
          <div className="text-right leading-relaxed relative">
            {/* d1 graphic behind text on mobile only */}
            <div
              className="absolute inset-0 flex items-end justify-start lg:hidden pointer-events-none"
              style={{ bottom: "-54px", left: "-32px" }}
            >
              <Image
                src="/d1.svg"
                alt="Decorative illustration"
                width={180}
                height={200}
                priority
                sizes="180px"
              />
            </div>
            <div className="relative z-10">
              <h2 className="mb-2">April 25, 2026.</h2>
              <div>Frankies 457 Spuntino.</div>
              <div>A night in Carroll Gardens.</div>
              <div>Dinner&apos;s on us.</div>
              <div>Bring a light jacket.</div>
            </div>
          </div>
        </div>

        {/* Video section */}
        <VideoPlayer />

        {/* Bottom graphics */}
        <div className="flex flex-col items-center mt-12 lg:mt-16">
          <div className="relative flex items-center justify-center">
            <Image
              src="/d2.svg"
              alt="Decorative element"
              width={280}
              height={100}
              priority
              className="ml-12 sm:ml-24 w-48 h-auto md:w-64 lg:w-[280px]"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 280px, 280px"
            />
            <Image
              src="/logo.svg"
              alt="Haley & Josh logo"
              width={65}
              height={65}
              className="absolute opacity-80 w-12 h-12 md:w-14 md:h-14 lg:w-[65px] lg:h-[65px]"
              priority
              sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 65px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
