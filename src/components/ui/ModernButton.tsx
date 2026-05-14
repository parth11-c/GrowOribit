"use client";

import React from "react";
import styled from "styled-components";

export type ModernButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: "default" | "sm";
};

const StyledWrapper = styled.div<{ $size: "default" | "sm" }>`
  button {
    background-color: white;
    color: black;
    border-radius: 10em;
    font-size: ${({ $size }) => ($size === "sm" ? "14px" : "17px")};
    font-weight: 600;
    padding: ${({ $size }) => ($size === "sm" ? "0.7em 1.25em" : "1em 2em")};
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 1px solid black;
    box-shadow: 0 0 0 0 black;
  }

  button:hover {
    transform: translateY(-4px) translateX(-2px);
    box-shadow: 2px 5px 0 0 black;
  }

  button:active {
    transform: translateY(2px) translateX(1px);
    box-shadow: 0 0 0 0 black;
  }
`;

export default function ModernButton({ children, size = "default", ...props }: ModernButtonProps) {
  return (
    <StyledWrapper $size={size}>
      <button {...props}>{children}</button>
    </StyledWrapper>
  );
}
