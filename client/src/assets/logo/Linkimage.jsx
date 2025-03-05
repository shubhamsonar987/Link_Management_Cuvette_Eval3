import React from "react";

const Linkimage = ({ className, style }) => {
  return (
    <div
      style={{
        marginRight: "1rem",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
      className={className}
    >
      <svg
        width="24"
        height="23"
        viewBox="0 0 26 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26 1.625H0V0H26V1.625ZM0 7.3125L0.8125 6.5H25.1875L26 7.3125V15.4375L25.1875 16.25H0.8125L0 15.4375V7.3125ZM1.625 8.125V14.625H24.375V8.125H1.625ZM0 22.75H26V21.125H0V22.75Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default Linkimage;
