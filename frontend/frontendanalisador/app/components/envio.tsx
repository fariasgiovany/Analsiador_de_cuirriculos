'use client'
import React from 'react'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function Envio() {
    const [file, setFile] = React.useState<File | null>(null);
    const [htmlContent, setHtmlContent] = React.useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/enviar', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const html = await response.text();
                setHtmlContent(html);
            } else {
                console.error('File upload failed');
            }
        }
    };


    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <div>
            

            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <button type="submit">Enviar PDF</button>
                
            </form>
            <button type="button" onClick={reactToPrintFn}>Gerar PDF</button>
            {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} ref={contentRef} />}
        </div>

    );
    

  
  }
    
    
 