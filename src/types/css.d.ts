import "react";

declare module "react" {
  // allow CSS custom properties (e.g. "--el-width") in style props
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
