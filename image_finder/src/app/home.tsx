"use client";

import ChooseFile from "@/components/choose-file";
import { EdgeStoreProvider } from "../lib/edgestore";

export default function Home(){
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold">Image Product Finder</h1>
            <h3>Upload any image and find online stores where the item in the image is available for purchase!</h3>

            <EdgeStoreProvider>
                <ChooseFile/>
            </EdgeStoreProvider>
        </div>
    );
}