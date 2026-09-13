"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

/**
 * Must be a Client Component. Keystatic's react-server build of <Keystatic />
 * returns null by design, so rendering this from a Server Component produces a
 * blank page with no error.
 */
export default makePage(config);
