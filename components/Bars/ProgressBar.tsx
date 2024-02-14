'use client'
  import Progress from "../../base-components/Progress/Progress";

{/* <Preview> */}
function ProgressBar() {
    return (
      <>
<Progress className="h-6">
  <Progress.Bar
    className="w-2/3 barRed"
    role="progressbar"
    aria-valuenow={0}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    60%
  </Progress.Bar>
</Progress>
<Progress className="h-6 mt-3">
  <Progress.Bar
    className="w-6/7 barBlue"
    role="progressbar"
    aria-valuenow={0}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    80%
  </Progress.Bar>
</Progress>
<Progress className="h-6 mt-3">
  <Progress.Bar
    className="w-4/5 barGreen"
    role="progressbar"
    aria-valuenow={0}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    80%
  </Progress.Bar>
</Progress>
<Progress className="h-6 mt-3">
  <Progress.Bar
    className="w-3/4 barBlue"
    role="progressbar"
    aria-valuenow={0}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    70%
  </Progress.Bar>
</Progress>
</>
    )}
// </Preview>

export default ProgressBar;
