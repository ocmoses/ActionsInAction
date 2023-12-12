"use client";
import React from "react";

export default function Iframe({ url }) {
  return (
    <>
    <head>
    <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' smdev.mtn.ng"/>
    </head>
    <iframe name="dsmiframe" frameBorder="0" className="h-[100%] w-[100%]" src={url} ></iframe>
    </>
  );
}
