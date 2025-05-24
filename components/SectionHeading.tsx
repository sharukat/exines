import React from "react";

type SectionHeadingProps = {
  title: React.ReactNode;
};

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className='w-full text-center mt-10'>
      <h2 className='text-lg uppercase md:text-xl lg:text-2xl font-semibold'>
        {title}
        <span className="block w-20 h-[5px] rounded-[5px] bg-blue-500 mx-auto mt-2"></span>
      </h2>
    </div>
  );
}