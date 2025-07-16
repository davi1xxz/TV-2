import React, { useState, useEffect } from "react";

const RecadoForm: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Formulário mobile (modal)
  const mobileForm = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={() => setShowModal(false)}>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 w-[95vw] max-w-md relative mx-2" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={() => setShowModal(false)}
          aria-label="Fechar"
        >
          ×
        </button>
        <form
          className="flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            (e.target as HTMLFormElement).reset();
            setShowModal(false);
          }}
        >
          <span className="font-semibold text-gray-700 dark:text-gray-100 text-base text-center mb-1">DEIXE SEU RECADO</span>
          <input name="nome" required placeholder="Nome" className="rounded px-3 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-sm w-full transition-colors" maxLength={32} />
          <input name="cidade" required placeholder="Cidade" className="rounded px-3 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-sm w-full transition-colors" maxLength={32} />
          <input name="recado" required placeholder="Seu recado... (máx. 100 caracteres)" className="rounded px-3 py-2 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-sm w-full transition-colors" maxLength={100} />
          <button type="submit" className="bg-primary text-primary-foreground font-semibold rounded px-4 py-2 shadow hover:bg-primary/90 transition-all text-base w-full mt-1">Enviar</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="w-full pb-2">
      {isMobile ? (
        <>
          <button
            className="w-full min-h-[38px] px-3 rounded-lg bg-gray-200 text-gray-800 dark:bg-white/20 dark:text-white font-semibold shadow hover:bg-gray-300 dark:hover:bg-white/30 transition-all text-base"
            onClick={() => setShowModal(true)}
          >
            Envie seu recado
          </button>
          {showModal && mobileForm}
        </>
      ) : (
        <form
          className="w-full max-w-5xl px-2 sm:px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-colors mx-auto"
          style={{backdropFilter: 'blur(2px)'}}
          onSubmit={e => {
            e.preventDefault();
            (e.target as HTMLFormElement).reset();
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-semibold text-gray-700 dark:text-gray-100 text-xs sm:text-sm whitespace-nowrap mr-1 sm:mr-2">DEIXE SEU RECADO</span>
            <input name="nome" required placeholder="Nome" className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-xs sm:text-sm w-full sm:w-32 transition-colors" maxLength={32} />
            <input name="cidade" required placeholder="Cidade" className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-xs sm:text-sm w-full sm:w-32 transition-colors" maxLength={32} />
            <input name="recado" required placeholder="Seu recado... (máx. 100 caracteres)" className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-xs sm:text-sm flex-1 min-w-0 transition-colors" maxLength={100} />
            <button type="submit" className="bg-primary text-primary-foreground font-semibold rounded px-3 py-1 shadow hover:bg-primary/90 transition-all text-xs sm:text-sm whitespace-nowrap">Enviar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RecadoForm; 