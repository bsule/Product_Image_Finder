import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const filepath = path.join(process.cwd(), "google_cloud_key.json");
const visionClient = new ImageAnnotatorClient({ keyFilename: filepath });

export async function POST(request: NextRequest) {
    try {
        const { imageUrl } = await request.json();
        if (!imageUrl) {
            return NextResponse.json({ error: "No image URL provided" }, { status: 400 });
        }

        const [result] = await visionClient.annotateImage({
            image: { source: { imageUri: imageUrl } },
            features: [{ type: "OBJECT_LOCALIZATION" }],
        });

        return NextResponse.json(result.localizedObjectAnnotations ?? []); // return [] if theres an error with result
    } catch (error) {
        console.error("Google Vision API error:", error);
        return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
    }
}