import { useState } from 'react';
import './App.css';

interface Filme {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

function App() {
  const [busca, setBusca] = useState('');
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const API_KEY = "73247e33"; 

  const buscarFilmes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!busca.trim()) return;
    setErro(null);

    try {
      const resposta = await fetch(`https://www.omdbapi.com/?s=${busca}&apikey=${API_KEY}`);
      const dados = await resposta.json();

      if (dados.Response === "True") {
        setFilmes(dados.Search);
      } else {
        setErro("Filme não encontrado!");
        setFilmes([]);
      }
    } catch (err) {
      setErro("Erro ao conectar com a API.");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>🎬 CineBusca</h1>
        <form onSubmit={buscarFilmes}>
          <input 
            type="text" 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome de um filme..."
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      {erro && <p className="erro">{erro}</p>}

      <div className="lista-filmes">
        {filmes.map((filme) => (
          <div key={filme.imdbID} className="card-filme">
            <img 
              src={filme.Poster !== "N/A" ? filme.Poster : "https://via.placeholder.com/300x450?text=Sem+Capa"} 
              alt={filme.Title} 
            />
              <h3>{filme.Title}</h3>
              <p>{filme.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;