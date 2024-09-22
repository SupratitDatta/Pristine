import React, { createContext, useEffect, useState } from "react";

interface UploadWidgetProps {
    uwConfig: any;
    setPublicId: (publicId: string) => void;
    setState: React.Dispatch<React.SetStateAction<string[]>>;
}

const CloudinaryScriptContext = createContext<{ loaded: boolean }>({ loaded: false });

function UploadWidget({ uwConfig, setPublicId, setState }: UploadWidgetProps) {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } 
            else {
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            const cloudinary = (window as any).cloudinary;
            const myWidget = cloudinary.createUploadWidget(
                uwConfig,
                (error: any, result: any) => { 
                    if (!error && result && result.event === "success") {
                        console.log("Done! Here is the image info: ", result.info);
                        setState(prev => [...prev, result.info.secure_url]);
                        setPublicId(result.info.public_id);
                    }
                }
            );

            document.getElementById("upload_widget")?.addEventListener(
                "click",
                function () {
                    myWidget.open();
                },
                false
            );
        }
    };

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <button
                id="upload_widget"
                className="cloudinary-button"
                onClick={initializeCloudinaryWidget}
            >
                Upload
            </button>
        </CloudinaryScriptContext.Provider>
    );
}

export default UploadWidget;
export { CloudinaryScriptContext };