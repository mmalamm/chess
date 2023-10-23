import React, { FunctionComponent, ReactNode } from "react";

type ModalProps = {
  children?: ReactNode;
  onModalClose: () => void;
};

export const PlayScreenModal: FunctionComponent<ModalProps> = ({
  children,
  onModalClose,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className=" absolute top-0 h-screen w-screen bg-slate-900 text-white opacity-90" />
      <div className=" absolute top-32 m-4">
        <div
          className="absolute top-0 right-0 z-20 h-6 w-6 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-blue-600 p-1.5 font-bold"
          onClick={onModalClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            style={{ width: "100%", height: "100%" }}
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
