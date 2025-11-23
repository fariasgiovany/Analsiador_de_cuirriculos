import React from 'react';
import Envio from './components/envio';

export default function Home() {
  return (
    <div className='bg-white text-black'>

      <h1 className="text-4xl font-bold text-center mt-10">
        Bem vindo ao Analisador de Curriculos
      </h1>
      <p className="text-center mt-4">
        Aqui você pode fazer o upload do pdf do seu curriculo e receber dicas para melhorá-lo.
      </p>
      <div className="flex justify-center mt-10 ">
      <Envio />
          
        
        
      </div>
    </div>
  );
}
