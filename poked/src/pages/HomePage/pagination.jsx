import React from "react";

const Paginacion = ({ pagina, setPagina }) => {
  const onPreviusPage = () => {
    setPagina(pagina - 1);
  };

  const onNextPage = () => {
    setPagina(pagina + 1);
  };

  return (
    <div className="btn-container">
      <button className="btn" disabled={pagina <= 0} onClick={onPreviusPage}>
        Anterior
      </button>
      <button className="btn" onClick={onNextPage}>
        Siguiente
      </button>
    </div>
  );
};
export default Paginacion;
