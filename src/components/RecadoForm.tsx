import React, { useState } from "react";
import { cidadesBrasil } from '../data/cidades-brasil';

const RecadoForm: React.FC = () => {
  const [cidade, setCidade] = useState("");
  const [sugestoes, setSugestoes] = useState<string[]>([]);
  const [showSugestoes, setShowSugestoes] = useState(false);

  const handleCidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setCidade(valor);
    if (valor.length >= 3) {
      const filtradas = cidadesBrasil.filter(c => c.toLowerCase().startsWith(valor.toLowerCase()));
      setSugestoes(filtradas.slice(0, 8));
      setShowSugestoes(true);
    } else {
      setSugestoes([]);
      setShowSugestoes(false);
    }
  };

  const handleSugestaoClick = (s: string) => {
    setCidade(s);
    setSugestoes([]);
    setShowSugestoes(false);
  };

  return (
    <div className="w-full flex justify-center items-center pb-2">
      <form
        className="w-full max-w-5xl flex flex-col sm:flex-row items-center gap-2 px-4 py-3 bg-white rounded-xl shadow border border-gray-200"
        style={{backdropFilter: 'blur(2px)'}}
        onSubmit={e => {
          e.preventDefault();
          (e.target as HTMLFormElement).reset();
          setCidade("");
          setSugestoes([]);
          setShowSugestoes(false);
        }}
      >
        <span className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap mr-1 sm:mr-2">DEIXE SEU RECADO</span>
        <input
          name="nome"
          required
          placeholder="Nome"
          className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/90 text-xs sm:text-sm w-full sm:w-32"
          maxLength={32}
        />
        <div className="relative w-full sm:w-32">
          <input
            name="cidade"
            required
            autoComplete="off"
            placeholder="Cidade"
            value={cidade}
            onChange={handleCidadeChange}
            onBlur={() => setTimeout(() => setShowSugestoes(false), 100)}
            onFocus={() => cidade.length >= 3 && sugestoes.length > 0 && setShowSugestoes(true)}
            className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/90 text-xs sm:text-sm w-full"
            maxLength={32}
          />
          {showSugestoes && sugestoes.length > 0 && (
            <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded shadow mt-1 max-h-40 overflow-y-auto text-xs sm:text-sm">
              {sugestoes.map((s, i) => (
                <li
                  key={s + i}
                  className="px-3 py-1 hover:bg-red-100 cursor-pointer"
                  onMouseDown={() => handleSugestaoClick(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          name="recado"
          required
          placeholder="Seu recado..."
          className="rounded px-2 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/90 text-xs sm:text-sm flex-1 min-w-0"
          maxLength={120}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded px-3 py-1 shadow hover:from-red-600 hover:to-pink-600 transition-all text-xs sm:text-sm whitespace-nowrap"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RecadoForm; 