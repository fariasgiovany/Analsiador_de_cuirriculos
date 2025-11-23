import { url } from 'inspector';
import { JetBrains_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import ReactPDF from '@react-pdf/renderer'

export async function POST(request: NextRequest) {
    const form = await request.formData();
    const incomingFile = form.get('file');

    if (!incomingFile || typeof (incomingFile as File).arrayBuffer !== 'function') {
        return NextResponse.json({ error: 'Nenhum arquivo enviado no campo "file"' }, { status: 400 });
    }
    console.log('Arquivo recebido, encaminhando para o servidor externo...');
    const file = incomingFile as File;
    console.log(`Nome do arquivo: ${file.name}, tamanho: ${file.size} bytes.`);
    

    const externalUrl = process.env.BACK_HOST || 'http://localhost:8000/criar2/';
    console.log(`Enviando arquivo para ${externalUrl} ...`);
    const formData = new FormData();
    formData.append('file', file, file.name);

    const externalRes = await fetch(externalUrl, {
        method: 'POST',
        
        body: formData,
    });
    console.log('Resposta recebida do servidor externo.');
    // espera um arquivo HTML de resposta
    const contentType = externalRes.headers.get('content-type') || 'text/html';
    const arrayBuffer = await externalRes.arrayBuffer();
    
    
    

    if (!externalRes.ok) {
        const text = new TextDecoder().decode(arrayBuffer);
        return NextResponse.json({ error: 'Erro no servidor externo', status: externalRes.status, details: text }, { status: 502 });
    }

    // devolve o HTML como arquivo para o cliente
    return new NextResponse(arrayBuffer, {
        status: externalRes.status,
        headers: {
            'Content-Type': contentType,
            'Content-Disposition': 'attachment; filename="response.html"',
        },
    });
}


