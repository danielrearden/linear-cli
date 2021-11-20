import flatCache from "flat-cache";
import { getCacheDir } from "./routines/getCacheDir";

export const cache = flatCache.load("linear", getCacheDir());
