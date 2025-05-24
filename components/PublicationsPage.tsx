"use client";

import React, { use } from 'react'
import { motion } from "framer-motion";
import { Card, CardHeader, Input, Chip } from "@nextui-org/react";
import { useState } from "react";
import { Publication } from '@/typings';
import { Select, SelectItem } from "@nextui-org/react";
import { HiDocumentText } from "react-icons/hi";
import { Link } from "@nextui-org/react";

type Props = {
  Papers: Publication[];
}

// Define type for sort fields
type SortFieldType = "year" | "title";

// Define type for sort direction
type SortDirectionType = "ascending" | "descending";


export const SORTFIELD = [
  { key: "year", label: "Year" },
  { key: "title", label: "Title" },
];

export const SORTBY = [
  { key: "ascending", label: "Ascending" },
  { key: "descending", label: "Descending" },
];


export default function Publications({ Papers }: Props) {

  const [query, setQuery] = useState<string>("");
  const [sortField, setSortField] = useState<SortFieldType>("year");
  const [sortBy, setSortBy] = useState<SortDirectionType>("descending");

  const sortFunc = (
    data: Publication[], // Array of Publication
    sortBy: "ascending" | "descending", // Allowed values for sort order
    sortField: keyof Publication // A key from the Publication type
  ): Publication[] => {
    return [...data].sort((a, b) => {
      const valueA = String(a[sortField]).toLowerCase();
      const valueB = String(b[sortField]).toLowerCase();

      if (sortBy === "ascending") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }

      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    });
  };

  const [list, setList] = useState<Publication[]>(() =>
    sortFunc(Papers.filter(publication => publication.year !== "Year Unknown"), "descending", "year")
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    const filteredResults = Papers.filter((publication) => {
      if (searchQuery === "") return true;
      return publication.title.toLowerCase().includes(searchQuery);
    });

    const sortedResults = sortFunc(filteredResults, sortBy, sortField);
    setList(sortedResults);
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortField = e.target.value as SortFieldType;
    setSortField(newSortField);

    const filteredResults = Papers.filter((publication) => {
      if (query === "") return true;
      return publication.title.toLowerCase().includes(query);
    });

    setList(sortFunc(filteredResults, sortBy, newSortField));
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as SortDirectionType;
    setSortBy(newSortBy);

    const filteredResults = Papers.filter((publication) => {
      if (query === "") return true;
      return publication.title.toLowerCase().includes(query);
    });

    setList(sortFunc(filteredResults, newSortBy, sortField));
  };


  return (
    <section id="publications" className="max-w-5xl snap-start">

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
        className='mt-10 mb-28 scroll-mt-28 flex flex-col justify-center items-center w-full max-w-5xl space-y-8'>

        <form className='flex flex-col md:flex-row gap-10 items-center w-full '>
          <Input
            classNames={{
              base: "max-w-xs h-full",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search"
            size="sm"
            type="search"
            onChange={handleSearch}
          />
          <Select
            label="Sort Field:"
            placeholder="Select the field"
            className="max-w-xs"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            {SORTFIELD.map((field) => (
              <SelectItem key={field.key} value={field.key}>
                {field.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Sort By:"
            placeholder="Select the order"
            className="max-w-xs"
            value={sortBy}
            onChange={handleSortByChange}
          >
            {SORTBY.map((type) => (
              <SelectItem key={type.key} value={type.key}>
                {type.label}
              </SelectItem>
            ))}
          </Select>

        </form>

        <div className="gap-y-2 grid grid-cols-1 w-full">
          {list
            .filter(publication => publication.year !== "Year Unknown")
            .map(publication => (
              <Card
                isBlurred
                key={publication.title}
                className='p-4 md:w-5xl'>
                <CardHeader className="flex-col items-start">
                  <div className='flex flex-row gap-2 justify-items-start items-center pb-2'>
                    <Chip size="sm" color="primary">{publication.year}</Chip>
                    {publication.url && (
                      <Link
                        isExternal
                        className="bg-gray-200 p-2 text-gray-700 hover:text-gray-950 flex items-center rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
                        href={publication.url}
                      >
                        <HiDocumentText />
                      </Link>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{publication.title}</h3>
                  <p className="text-sm md:text-base uppercase">{publication.citation}</p>
                  <div className="pl-2 border-l-4 border-blue-500">
                    <p className="text-sm">{publication.authors}</p>
                  </div>

                </CardHeader>
              </Card>
            ))}
        </div>
      </motion.div>
    </section>
  )
}