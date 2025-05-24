"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { HiOutlinePencilAlt, HiOutlinePlusSm } from "react-icons/hi";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Textarea, Input } from "@nextui-org/input";
import { FileUpload } from "@/components/file-upload";
import { createClient } from "next-sanity";
import { Project } from "@/typings";
import { urlFor } from "@/sanityClient";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Image,
  Link,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { CiGlobe } from "react-icons/ci";

const NEXT_PUBLIC_SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const NEXT_PUBLIC_SANITY_API_KEY = process.env.NEXT_PUBLIC_SANITY_API_KEY;

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  const { isSignedIn, user } = useUser();
  const client = createClient({
    dataset: "production",
    projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-03-25",
    token: NEXT_PUBLIC_SANITY_API_KEY,
    ignoreBrowserTokenWarning: true,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    description: "",
    link: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      description: "",
      link: "",
    });
    setFiles([]);
    setIsPopoverOpen(false); // Close the popover
  };

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      let imageId = null;

      if (files.length > 0) {
        const file = files[0];
        if (!file.type.startsWith("image/")) {
          console.error("Uploaded file is not an image");
          return;
        }
        const imageAsset = await client.assets.upload("image", file, {
          filename: file.name,
        });
        imageId = imageAsset._id;
      }

      const mutations = [
        {
          create: {
            _type: "projects",
            title: formData.title,
            user: formData.name,
            description: formData.description,
            link: formData.link,
            image: imageId
              ? { _type: "image", asset: { _type: "reference", _ref: imageId } }
              : null,
          },
        },
      ];

      const response = await fetch(
        `https://${NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${NEXT_PUBLIC_SANITY_API_KEY}`,
          },
          body: JSON.stringify({ mutations }),
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully!");
        resetForm(); // Reset form after successful submission
      } else {
        console.error("Failed to submit data:", response.statusText);
      }
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-center items-center w-full space-y-8 py-10">
        {projects?.map((project) => (
          <Card
            key={project?._id || Math.random()}
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-7xl"
            shadow="sm"
          >
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-2 md:gap-4 items-center justify-center">
                <div className="relative col-span-1 md:col-span-2 lg:col-span-4">
                  <Image
                    alt="Post image"
                    className="object-cover w-full"
                    height={200}
                    shadow="md"
                    src={
                      project?.image
                        ? urlFor(project.image).url()
                        : "/placeholder-image.jpg"
                    }
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-1 md:col-span-4 lg:col-span-8">
                  <CardHeader className="flex flex-col items-start">
                    <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
                      {project?.title}
                    </h1>
                    <div className="flex flex-row gap-4 mt-2">
                      <Chip
                        size="sm"
                        color="primary"
                        variant="flat"
                        className="uppercase text-tiny p-4"
                      >
                        {project?.user}
                      </Chip>
                      {project?.link && project?.link !== "N/A" && (
                        <Link
                          isExternal
                          className="bg-gray-200 p-2 text-gray-700 hover:text-gray-950 flex items-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                          href={project?.link}
                        >
                          <CiGlobe />
                        </Link>
                      )}
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm md:text-base mt-2">
                      {project?.description || "No description available"}
                    </p>
                  </CardBody>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Only show the add content button if user is signed in */}
      {isSignedIn && (
        <div className="fixed bottom-4 right-4">
          <Popover
            placement="top-start"
            isOpen={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
          >
            <PopoverTrigger>
              <Button isIconOnly className="rounded-full" color="primary">
                <HiOutlinePlusSm />
              </Button>
            </PopoverTrigger>
            <form onSubmit={handleSubmit}>
              <PopoverContent
                className="p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-lg 
                                max-w-7xl max-h-7xl overflow-auto sm:w-lg sm:max-w-lg sm:max-h-lg"
              >
                <div className="flex flex-col gap-4">
                  <Input
                    label="Title"
                    isRequired
                    placeholder="Enter a project title"
                    labelPlacement="outside"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                  <Input
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    labelPlacement="outside"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    isRequired
                    label="Project description"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    className="max-w-full pb-4"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="url"
                    label="GitHub link"
                    placeholder="Enter the project's GitHub link"
                    labelPlacement="outside"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                  />
                  <div className="w-full border-neutral-200 dark:border-neutral-800 rounded-lg">
                    <FileUpload onChange={handleFileUpload} />
                  </div>
                  <Button
                    type="submit"
                    className="mt-4 self-center"
                    color="primary"
                    startContent={<HiOutlinePencilAlt />}
                  >
                    Share
                  </Button>
                </div>
              </PopoverContent>
            </form>
          </Popover>
        </div>
      )}
    </div>
  );
}
