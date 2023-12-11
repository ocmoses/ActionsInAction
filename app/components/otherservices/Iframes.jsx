"use client";
import React from "react";

export default function Iframe({ url }) {
  return (
    <iframe name="dsmiframe" frameBorder="0" className="h-[100%] w-[100%]" src={url} ></iframe>
  );
}
