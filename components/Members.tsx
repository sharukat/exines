"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Link,
  Chip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { BsLinkedin } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { Member } from "@/typings";
import { urlFor } from "@/sanityClient";
import SectionHeading from "./SectionHeading";

type Props = {
  members: Member[];
};

export default function MemberComponent({ members = [] }: Props) {
  const [filter, setFilter] = useState("all");

  // Add null check before filtering
  const filteredMembers =
    members?.filter((person) => {
      if (filter === "all") return true;
      if (filter === "professor") return person.role === "Professor";
      return person.role === filter;
    }) || [];

  const sortMembers = filteredMembers.sort((a, b) => {
    const order = [
      "professor",
      "phd",
      "masters",
      "internvisitor",
    ];

    // Determine the roles with alumni status considered
    const roleAIndex = order.indexOf(a.role);
    const roleBIndex = order.indexOf(b.role);

    // Sort first by role order, then by alumni status
    if (roleAIndex !== roleBIndex) {
      return roleAIndex - roleBIndex; // Sort by role order
    }

    // If roles are the same, sort by alumni status (non-alumni first)
    return a.alumni === b.alumni ? 0 : a.alumni ? 1 : -1;
  });

  return (
    <div className="mt-10 mb-10 flex flex-col justify-center items-center space-y-8">
      {/* Tabs for filtering */}
      <div className="flex flex-wrap gap-4">
        <Tabs
          color="primary"
          aria-label="Tabs colors"
          radius="full"
          selectedKey={filter}
          onSelectionChange={(key) => setFilter(key.toString())}
        >
          <Tab key="all" title="All" />
          <Tab key="phd" title="PhD" />
          <Tab key="masters" title="Masters" />
          <Tab key="internvisitor" title="Interns" />
        </Tabs>
      </div>

      {/* Cards for displaying filtered members */}
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {sortMembers.map((person, index) => (
            person.role !== "collaborator" && (
            <Card
              isBlurred
              isFooterBlurred
              className="items-center"
              shadow="md"
              key={index}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <Chip
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="uppercase"
                  >
                    {person.role === "internvisitor" ? "Intern" : person.role}
                  </Chip>
                  {person.linkedin && (
                    <Link
                      isExternal
                      className="bg-gray-200 p-2 text-gray-700 hover:text-gray-950 flex items-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                      href={person.linkedin}
                    >
                      <BsLinkedin />
                    </Link>
                  )}
                  {person.website && person.website !== "N/A" && (
                    <Link
                      isExternal
                      className="bg-gray-200 p-2 text-gray-700 hover:text-gray-950 flex items-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                      href={person.website}
                    >
                      <CiGlobe />
                    </Link>
                  )}
                </div>
                <h3 className="font-bold text-lg pt-2">{person.name}</h3>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                {person?.image && (
                  <Image
                    alt={`Photo of ${person.name}`}
                    className="object-cover rounded-xl"
                    src={urlFor(person.image).url()}
                    width={200}
                  />
                )}
              </CardBody>
              {person.alumni && (
                <CardFooter
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[calc(90%_-_4px)] 
                             justify-center before:bg-white/10 border-white/20 border-1 
                             overflow-hidden py-1 rounded-large shadow-small z-10"
                >
                  <p className="text-sm text-white font-semibold">Alumni</p>
                </CardFooter>
              )}
            </Card>
          )))}
        </div>
      </div>

      <SectionHeading title="Our Collaborators" /><br />

      {/* Cards for displaying collaborators */}
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {sortMembers.map((person, index) => (
            person.role === "collaborator" && (
            <Card
              isBlurred
              isFooterBlurred
              className="items-center"
              shadow="md"
              key={index}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
                <div className="flex flex-row items-center justify-between w-full">
                  <Chip
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="uppercase"
                  >
                    {person.role}
                  </Chip>
                  {person.linkedin && (
                    <Link
                      isExternal
                      className="bg-gray-200 p-2 text-gray-700 hover:text-gray-950 flex items-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                      href={person.linkedin}
                    >
                      <BsLinkedin />
                    </Link>
                  )}
                  {person.website && person.website !== "N/A" && (
                    <Link
                      isExternal
                      className="bg-gray-200 p-2 text-gray-700 hover:text-gray-950 flex items-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                      href={person.website}
                    >
                      <CiGlobe />
                    </Link>
                  )}
                </div>
                <h3 className="font-bold text-lg pt-2">{person.name}</h3>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                {person?.image && (
                  <Image
                    alt={`Photo of ${person.name}`}
                    className="object-cover rounded-xl"
                    src={urlFor(person.image).url()}
                    width={200}
                  />
                )}
              </CardBody>
            </Card>
          )))}
        </div>
      </div>

    </div>
  );
}
