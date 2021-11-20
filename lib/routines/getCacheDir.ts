// @ts-expect-error
import cachedir from "cachedir";

export const getCacheDir = () => cachedir("linear-cli");
