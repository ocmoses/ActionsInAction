"use client"
import { createContext, useState } from "react";
import useFileViewer from "@/hooks/useFileViewer";


export const FileViewContext = createContext();

export default function FileViewProvider({children}) {

    return <FileViewContext.Provider value={useFileViewer()}>
              {children}  
           </FileViewContext.Provider>

}
