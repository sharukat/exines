"use client";

import React from "react";
import { HeadInfo, Service, Teaching } from "@/typings";
import { fetchHeadInfo, fetchServices, fetchTeaching } from "@/lib/fetchData";
import MaleknazComp from "@/components/MaleknazComp";

export default function Maleknaz({
  headInfo,
  services,
  teaching,
}: {
  headInfo: HeadInfo;
  services: Service[];
  teaching: Teaching[];
}) {
  return (
    <section id="members" className="w-[80%]">
      <MaleknazComp
        headInfo={headInfo}
        services={services}
        teaching={teaching}
      />
    </section>
  );
}

export async function getServerSideProps() {
  const headInfo: HeadInfo = await fetchHeadInfo();
  const services: Service[] = await fetchServices();
  const teaching: Teaching[] = await fetchTeaching();
  return {
    props: {
      headInfo: headInfo,
      services: services,
      teaching: teaching,
    },
  };
}
