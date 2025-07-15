import React, { useState } from "react";

const RecadoForm: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center pb-2 px-2">
      <form
        className="w-full max-w-5xl flex flex-col sm:flex-row items-center gap-2 px-2 sm:px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow transition-colors"
        style={{backdropFilter: 'blur(2px)'}}
        onSubmit={e => {
          e.preventDefault();
          (e.target as HTMLFormElement).reset();
        }}
      >
        <span className="font-semibold text-gray-700 dark:text-gray-100 text-xs sm:text-sm whitespace-nowrap mr-1 sm:mr-2">DEIXE SEU RECADO</span>
        <input
          name="nome"
          required
          placeholder="Nome"
          className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-xs sm:text-sm w-full sm:w-32 transition-colors"
          maxLength={32}
        />
        <input
          name="cidade"
          required
          placeholder="Cidade"
          className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-xs sm:text-sm w-full sm:w-32 transition-colors"
          maxLength={32}
        />
        <input
          name="recado"
          required
          placeholder="Seu recado... (máx. 100 caracteres)"
          className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-800 text-xs sm:text-sm flex-1 min-w-0 transition-colors"
          maxLength={100}
        />
        <button
          type="submit"
          className="bg-gradient-to-br from-[#ad1917] via-[#f37335] to-[#fda63d] text-white font-semibold rounded px-3 py-1 shadow hover:from-[#b81a18] hover:to-[#ffb14d] transition-all text-xs sm:text-sm whitespace-nowrap"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RecadoForm; 