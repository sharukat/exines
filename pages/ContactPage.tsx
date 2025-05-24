import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import SectionHeading from "../components/SectionHeading";
import { BackgroundGradient } from "../components/subcomponents/background-gradient";

export default function Contact() {
  return (
    <section id="members" className="w-[80%]">
      <div className="flex flex-col gap-y-5">
        <SectionHeading title="Join the Innovative Journey at EXINES Lab" />
        <br />

        <div className="flex flex-col gap-6 px-5 items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <BackgroundGradient className="rounded-full p-10 sm:p-5 bg-[#f1f5f9] dark:bg-zinc-900 flex items-center justify-center">
              <div className="text-center w-full">
                <h1 className="text-4xl lg:text-6xl font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 animate-gradient">
                  Join Our Team
                </h1>
              </div>
            </BackgroundGradient>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-y-5 text-base 2xl:text-lg">
              <p className="text-center">
                Our Lab members are committed to provide a safe and inclusive
                space for everyone.{" "}
              </p>
              <p className="text-center">
                If you have a disability or you may need any special
                accommodations please don&apos;t let that hold you back in any
                way from applying for a position in our lab.
              </p>
              <p>
                I have a number of research projects supported by public and
                private sectors in Canada. I am looking for PhD and MSc students
                joining my research lab.
              </p>
              <h2 className="uppercase">Required Skills</h2>
              <ul className="list-disc list-inside indent-5">
                <li>Python and Java Programming</li>
                <li>Degree in Software Engineering or Computer Science</li>
                <li>Statistical Analysis of Data</li>
                <li>
                  Machine Learning (familiarity with TensorFlow, Keras or
                  PyTorch is a plus)
                </li>
              </ul>
              <p className="text-left text-base font-semibold">
                Please submit the following documents to the head of the EXINES
                Lab via the email address:{" "}
              </p>
              <Chip color="default">mnayebi AT yorku DOT ca</Chip>
              <ul className="list-disc list-inside indent-5">
                <li>Your resume</li>
                <li>Your most recent educational transcripts</li>
                <li>
                  Statement of purpose explaining your interest and how it
                  relates to the work done at EXINES
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-center uppercase text-lg md:text-xl font-semibold mt-10">
          Don&apos;t hesitate to reach out to us!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 text-base 2xl:text-lg">
          <Card className="p-5 bg-transparent border-none">
            <CardHeader className="flex justify-center text-center">
              <h2 className="text-base font-semibold uppercase ">
                Not a software engineering student?
              </h2>
            </CardHeader>
            <Divider />
            <CardBody className="text-center">
              <p>
                If you do not have a degree in software engineering but have an
                idea and passion that intersects with software and your field of
                study (whether it be politics, journalism, law, fashion,
                humanities, medicine, sports, etc.), we welcome you to our lab!
                Our projects are designed to improve societal experiences
                through the use of software.
              </p>
            </CardBody>
          </Card>
          <Card className="p-5 bg-transparent border-none">
            <CardHeader className="flex justify-center text-center">
              <h2 className="text-base font-semibold uppercase">
                Joining as an undergraduate or a high school student?
              </h2>
            </CardHeader>
            <Divider />
            <CardBody className="text-center">
              <p>
                Contact us if you are an undergraduate student, a high school
                student, a curious individual, or a software engineering
                practitioner looking for an opportunity to gain new experience
                and work in a research lab. We continuously welcome interns and
                visitors.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
