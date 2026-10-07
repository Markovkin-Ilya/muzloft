declare module "*.css" {
  const content: string | string[];
  export default content;
}

declare module "*.svg" {
  import React = require("react");

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const content: any;
  export default content;
}
