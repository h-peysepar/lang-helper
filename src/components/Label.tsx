import React from "react";

function Label({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const hrClass: string =
    "bg-gray-100 px-5 my-2 justify-self-stretch rounded-lg flex-1";
  return (
    <div className="flex items-center gap-2 self-stretch px-3 pt-1 pb-3">
      <hr className={hrClass} />
      <label className={" text-gray-200 tracking-widest font-bold " + className}>
        {children}
      </label>
      <hr className={hrClass} />
    </div>
  );
}

export default Label;
