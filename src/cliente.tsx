import { useState, useEffect } from 'react';
import { presupuesto } from './components/presupuesto';

export const Cliente = () => {
  const [selection, setSelection] = useState<boolean[]>([false, false, false]);
  const [total, setTotal] = useState(0);
  const [inputPages, setInputPages] = useState(0);
  const [inputLanguage, setInputLanguage] = useState(0);

  // LÓGICA
  const handleChangePages = (event: { target: { value: any } }) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 2) {
      const updatedNumber = Number(event.target.value);
      if (!isNaN(updatedNumber)) {
        setInputPages(updatedNumber);

      }
    }
  };

  const incrementPages = () => {
    const updatedNumber = Math.min(inputPages + 1, 99)
    setInputPages(updatedNumber);
  };

  const decrementPages = () => {
    const updatedNumber = Math.max(inputPages - 1, 0)
    setInputPages(updatedNumber);
  };

  const handleChangeLanguage = (event: { target: { value: any } }) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 2) {
      const updatedNumber = Number(event.target.value);
      if (!isNaN(updatedNumber)) {
        setInputLanguage(updatedNumber);
      }
    }
  };

  const incrementLanguage = () => {
    const updatedNumber = Math.min(inputLanguage + 1, 99)
    setInputLanguage(updatedNumber);
  };

  const decrementLanguage = () => {
    const updatedNumber = Math.max(inputLanguage - 1, 0)
    setInputLanguage(updatedNumber);
  };

  const checkClick = (index: number) => {
    setSelection((selection) =>
      selection.map((isSelected, indice) => (indice === index ? !isSelected : isSelected))
    );
  };

  // EFFECTS


  useEffect(() => {
    const newTotal = selection.reduce((acumulado, isSelected, index) => {
      if (isSelected) {
        return acumulado + presupuesto[index].precio;
      }
      return acumulado;
    }, 0);

    setTotal(newTotal);
  }, [selection]);


  const sumar = () => {
    const resultado = (inputPages * 30) + (inputLanguage * 30);
    return resultado;
  };

  // suma checkbox + inputs
  const resultFinal = total + sumar();


  // RETURN JSX
  return (
    <div>
      <p>📌 ¿Qué quieres hacer?</p>
      {presupuesto.map(({ producto }, index) => (
        <div key={index}>
          <label>
            <input type="checkbox" checked={selection[index]} onChange={() => checkClick(index)} />
            {producto}
          </label>
        </div>
      ))}
      <label htmlFor="input1">Numero de paginas: </label>
      <button onClick={decrementPages}>-</button>
      <input type="number" id="input1" min={0} max={99} value={inputPages} onChange={handleChangePages} />
      <button onClick={incrementPages}>+</button>
      <br />
      <br />
      <label htmlFor="input2">Numero de idiomas: </label>
      <button onClick={decrementLanguage}>-</button>
      <input type="number" id="input2" min={0} max={99} value={inputLanguage} onChange={handleChangeLanguage} />
      <button onClick={incrementLanguage}>+</button>
      <div>Total: {resultFinal}€</div>
    </div>
  );
}