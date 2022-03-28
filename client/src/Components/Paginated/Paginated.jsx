import React from "react";
import styles from "./Paginated.module.css";

const Paginated = ({ breedsPerPage, breeds, paginated }) => {
  const pageNumbers = [];
  const pages = Math.ceil(breeds / breedsPerPage);

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav className={styles.paginadoContainer}>
        <ul className={styles.ul}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginated(number)}
                  className={styles.numeroPaginado}
                >
                  {number}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginated;
