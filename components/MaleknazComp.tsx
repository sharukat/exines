"use client";

import React from "react";
import { HeadInfo, Service, Teaching } from "@/typings";
import SectionHeading from "../components/SectionHeading";
import { urlFor } from "@/sanityClient";
import ExinesButton from "@/components/subcomponents/exines_button";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Chip,
  Spacer,
} from "@nextui-org/react";

type HeadProps = {
  headInfo: HeadInfo;
  services: Service[];
  teaching: Teaching[];
};

function MaleknazComp({ headInfo, services, teaching }: HeadProps) {
  return (
    <section id="outdesk" className="max-w-7xl flex flex-col items-center justify-center mx-auto">
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 w-full px-5 md:px-10 items-center mt-10">
        {/* Image taking 1/3 of the grid */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center h-full space-y-6">
          <Image
            isBlurred
            src={urlFor(headInfo.image).url()}
            alt="photo"
            width={400}
            height={400}
            className="object-fill rounded-xl"
          />
        </div>

        <div className="lg:col-span-2 flex flex-col items-center justify-center h-full">
          <h4 className="uppercase tracking-[5px] text-black-700 text-base md:text-lg lg:text-xl">
            {headInfo.name}
          </h4>
          <div className="p-5 md:text-lg sm:text-base text-center leading-relaxed space-y-6">
            <p>{headInfo.description}</p>
          </div>
          <h4 className="text-black-700 text-base md:text-lg lg:text-xl">
            For more information visit EXINES
          </h4>
          <ExinesButton />
        </div>
      </div>

      <SectionHeading title="Service" />
      <br />
      <Card className=" mx-auto">
        <CardHeader className="px-10 pt-10">
          <Chip
            variant="flat"
            color="primary"
            className="px-3 py-8"
            radius="lg"
          >
            <h3 className="text-xl md:text-2xl font-semibold">Organizations</h3>
          </Chip>
        </CardHeader>
        <CardBody className="px-[3.5rem] pb-10">
          <ul className="list-disc pl-5">
            {services
              .filter((service) => service.type === "organization")
              .map((service, index) => {
                // Determine if location and year should be displayed
                const shouldShowLocation =
                  service.location && service.location !== "N/A";
                const shouldShowYear = service.year && service.year !== "N/A";

                // Combine location and year if both are valid
                const locationYearText =
                  shouldShowLocation && shouldShowYear
                    ? `${service.location}, ${service.year}`
                    : shouldShowLocation
                      ? service.location
                      : shouldShowYear
                        ? service.year
                        : "";

                return (
                  <li key={index} className="py-2">
                    <h2 className="text-base md:text-lg font-bold">
                      {service.title}
                    </h2>
                    <h4 className="text-base">{service.publisher}</h4>
                    {locationYearText && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {locationYearText}
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        </CardBody>
      </Card>

      <Spacer y={4} />

      <Card className=" mx-auto">
        <CardHeader className="flex flex-col items-start px-10 pt-10">
          <Chip
            variant="flat"
            color="primary"
            className="px-3 py-8"
            radius="lg"
          >
            <h3 className="text-xl md:text-2xl font-semibold">
              Review and Program Committee Membership
            </h3>
          </Chip>
        </CardHeader>
        <CardBody className="px-[3.5rem] pb-10">
          <h2 className="text-xl md:text-2xl font-bold ">Journals</h2>
          <Divider className="my-2" />
          <ul className="list-disc pl-5">
            {services
              .filter(
                (service) =>
                  service.type === "committee" &&
                  service.committee === "journals"
              )
              .map((service, index) => {
                const shouldShowYear = service.year && service.year !== "N/A";
                const locationYearText = shouldShowYear
                  ? `Since ${service.year}`
                  : "";

                return (
                  <li key={index} className="py-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base md:text-lg font-bold">
                        {service.title}
                      </h2>
                      <span className="text-sm text-gray-500"> - </span>
                      <h4 className="text-base">{service.publisher}</h4>
                    </div>
                    {locationYearText && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {locationYearText}
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        </CardBody>

        <CardBody className="px-[3.5rem] pb-10">
          <h2 className="text-xl md:text-2xl font-bold ">Conferences</h2>
          <Divider className="my-2" />
          <ul className="list-disc pl-5">
            {services
              .filter(
                (service) =>
                  service.type === "committee" &&
                  service.committee === "conferences"
              )
              .map((service, index) => {
                const shouldShowYear = service.year && service.year !== "N/A";
                const locationYearText = shouldShowYear
                  ? `Since ${service.year}`
                  : "";

                return (
                  <li key={index} className="py-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base md:text-lg font-bold">
                        {service.title}
                      </h2>
                      <span className="text-sm text-gray-500"> - </span>
                      <h4 className="text-base">{service.publisher}</h4>
                    </div>
                    {locationYearText && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {locationYearText}
                      </p>
                    )}
                  </li>
                );
              })}
          </ul>
        </CardBody>
      </Card>

      <SectionHeading title="Teaching & Tutorials" />
      <br />
      <Card className="mx-auto">
        <CardBody className="pb-10">
          {teaching.map((teach, index) => (
            <div key={index} className="flex flex-col gap-1 pb-5 px-10">
              <h2 className=" pt-10 text-xl md:text-2xl font-semibold">
                {teach.title}
              </h2>
              <Divider className="my-2" />
              <p className="text-base text-gray-700 dark:text-gray-300">
                {teach.description}
              </p>
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}

export default MaleknazComp;
