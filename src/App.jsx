import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';

import api from "./services/Api";

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [classe, setClasse] = useState('main');
  const [showMain, setShowMain] = useState(false);

  function handleInputChange(e){
    const { value } = e.target;
    setInput(value);
    showMain && setClasse(prevClasse => prevClasse.includes('hide') ? prevClasse : `${prevClasse} hide`);

    setTimeout(async () => {
      setShowMain(false);
    }, 900)
  }

  async function handleSearch(){
    setClasse('main');

    if(input === '') {
      alert("Preencha o campo de CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      if (response.data.erro === true) {
        alert("O CEP inserido não existe");
        setInput("");
        return;
      }
      setShowMain(true);
      setCep(response.data);
      setInput("");
      console.log(response);
    }catch{
      alert("O CEP inserido não está no formado correto");
      setInput("");
    }
  }

  return (
  <div className="divPrincipal">
    <h1 className="h1Title">Buscar CEP</h1>
    <div className="divInput">
      <input 
      type="text" 
      placeholder="Digite seu CEP..." 
      value={input}
      onChange={handleInputChange}
      />
      <button className="buttonSearch" onClick={handleSearch}>
      <FiSearch size={25} color="black"/>
      </button>
    </div>

    {showMain && Object.keys(cep).length > 0 && (
          <main className={classe}>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
    )}

    <div className="divContato">
        <p>Site feito por Daniel Holanda</p>
        <span><a target="_blank" href="https://linkedin.com/in/daniel-holanda-campos/">LinkedIn</a></span>
        <span>|</span>
        <span><a target="_blank" href="https://github.com/dholandac/">Github</a></span>
    </div>
  </div>
  );
}

export default App;