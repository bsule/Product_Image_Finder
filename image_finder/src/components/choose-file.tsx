"use client";

import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { SingleImageDropzone } from "./image-drop";

export default function ChooseFile() {
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();
    const { edgestore } = useEdgeStore();

    return (
        <div className="flex flex-col items-center m-6 gap-2">
            <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                onChange={(file) => { setFile(file); }}
            />

            <div className="h-[6px] w-44 border rounded overflow-hidden">
                <div className="h-full bg-black transition-all duration-150" style={{ width: `${progress}%` }} />
            </div>

            <button className="flex-col bg-black text-white" onClick={async () => {
                if (file) {
                    const res = await edgestore.myPublicImages.upload({ file, options: { temporary: true }, onProgressChange: (progress) => { setProgress(progress); } });

                    setUrl({
                        url: res.url,
                        thumbnailUrl: res.thumbnailUrl
                    });
                }
            }}>
                Upload
            </button>

            {url?.url && <Link href={url.url} target="_blank">URL</Link>}
            {url?.thumbnailUrl && <Link href={url.thumbnailUrl} target="_blank">THUMBNAIL</Link>}
        </div>
    );
}