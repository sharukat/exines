import type { FC } from "react";
import Image from "next/image";
import { TypewriterEffect } from "@/components/subcomponents/text-generate-effect";
import { LayoutGrid } from "@/components/layout-grid";

// Define types for our data structures
interface Word {
  text: string;
  className: string;
}

interface Card {
  id: number;
  className: string;
  thumbnail: string;
}

// Move static data outside the component
const GALLERY_CARDS: Card[] = [
  {
    id: 1,
    className: "md:col-span-1",
    thumbnail: "/001.jpg",
  },
  {
    id: 2,
    className: "col-span-1",
    thumbnail: "/002.png",
  },
  {
    id: 3,
    className: "col-span-1",
    thumbnail: "/003.jpg",
  },
  {
    id: 4,
    className: "md:col-span-1",
    thumbnail: "/004.jpg",
  },
  {
    id: 5,
    className: "md:col-span-1",
    thumbnail: "/005.jpg",
  },
  {
    id: 6,
    className: "md:col-span-1",
    thumbnail: "/006.jpg",
  },
] as const;

const TYPEWRITER_WORDS: Word[] = [
  {
    text: "{",
    className: "text-balance md:text-7xl font-semibold tracking-tight text-5xl",
  },
  {
    text: "EXINES",
    className:
      "text-gray-700 dark:text-gray-400 text-balance md:text-7xl font-bold tracking-[10px] text-5xl",
  },
  {
    text: "}",
    className: "text-balance md:text-7xl font-semibold tracking-tight text-5xl",
  },
] as const;

const HomePage: FC = () => {
  return (
    <section id="home" className="w-full flex justify-center">
      <div className="w-[80%] mb-28 scroll-mt-28 flex flex-col justify-center items-center space-y-8">
        <div className="text-center justify-center mt-20 w-full">
          <TypewriterEffect words={TYPEWRITER_WORDS} />
          <h1 className="text-balance md:text-6xl font-thin tracking-tight text-4xl">
            Software Engineering Lab
          </h1>
          <p className="mt-8 text-pretty text-lg md:text-xl lg:text-2xl font-normal text-slate-700 dark:text-slate-300 sm:text-xl/8">
            EXperimentally INtelligent in Engineering Software (EXINES) lab is
            at the forefront of advancing software engineering and requirements
            engineering through data-driven and innovative approaches. We
            specialize in understanding challenges in software development,
            enhancing agile practices, and leveraging analytics for improved
            project management. Our research spans requirements elicitation,
            product release planning, technical debt management, and open
            innovation, with a strong focus on mobile app development, AI-driven
            automation, and social impact. By blending academic rigor with
            practical application, we aim to bridge gaps between developers,
            users, and stakeholders, fostering solutions that address real-world
            needs while shaping the future of software engineering practices.
          </p>
        </div>

        <div className="w-full">
          <LayoutGrid cards={GALLERY_CARDS} />
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center gap-8 justify-center">
          {[
            { src: "/EXINES-logo.svg", darkMode: false },
            { src: "/EXINES-logo-light.svg", darkMode: true },
          ].map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt="EXINES Logo"
              width={100}
              height={100}
              className={`object-contain ${logo.darkMode ? "hidden dark:block" : "dark:hidden"}`}
              priority
            />
          ))}
          {[
            { src: "/yorku_light.svg", darkMode: false },
            { src: "/yorku_dark.svg", darkMode: true },
          ].map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt="York University Logo"
              width={500}
              height={100}
              className={`object-contain ${logo.darkMode ? "hidden dark:block" : "dark:hidden"}`}
              priority
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
