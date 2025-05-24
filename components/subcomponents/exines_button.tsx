"use client";

import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function ExinesButton() {
    return (
        <Link href="/" passHref>
            <Button color="primary" variant="shadow" className="mt-5" startContent={<IoLogOutOutline />}>
                EXINES
            </Button>
        </Link>
    )
};