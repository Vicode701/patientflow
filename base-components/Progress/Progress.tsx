import { twMerge } from "tailwind-merge";

type ProgressProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"div">;

function Progress(props: ProgressProps) {
  return (
    <div
      {...props}
      className={twMerge([
        "w-full h-6 bg-white rounded ",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
}

type BarProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"div">;

Progress.Bar = (props: BarProps) => {
  return (
    <div
      {...props}
      className={twMerge([
        "h-full rounded text-xs text-white flex justify-center items-center",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
};

export default Progress;
