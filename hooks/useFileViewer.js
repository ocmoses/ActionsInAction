"use client";

import { useState } from "react";

export default function useFileViewer(){

    const [fileViewer, setFileViewer] = useState(null);

    return {
        fileViewer,
        setFileViewer
    }

}
