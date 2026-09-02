import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/** Centered content well with the design's max width and responsive gutters. */
export function Container({ children, className, as = "div" }: ContainerProps) {
  const Component = as;
  return <Component className={cn("container-page", className)}>{children}</Component>;
}
