"use client";

import MinfoBioClient from "./minfo-bio-client";

type MinfoBioIslandProps = {
  initialVariantIndex: number;
};

export default function MinfoBioIsland({
  initialVariantIndex,
}: MinfoBioIslandProps) {
  return <MinfoBioClient initialVariantIndex={initialVariantIndex} />;
}
