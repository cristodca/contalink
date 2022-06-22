// Dependecies
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Components
import InvoiceCard from "./Components/InvoiceCard";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faList,
  faSearch,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as NoSearch } from "./Assets/Svg/no-data.svg";


// Main
function App() {
  // States
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [invoices, setInvoices] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(16);
  const [listOrder, setListOrder] = useState(false);

  // Función para controlar el envío de las fechas, es una validación extra, en caso de que se pueda dar clic al botón sin tener las fechas establecidas
  function handleSubmit(event) {
    event.preventDefault();

    if (!dateStart) {
      alert("No hay fecha de inicio");
      return;
    }
    if (!dateEnd) {
      alert("No hay fecha de fin");
      return;
    }

    // Si ambas fechas están establecidas llama a la función
    getInvoices(dateStart, dateEnd);
  }

  // Función para obtener las facturas directamente de la API.
  function getInvoices(date_start, date_end) {
    const queryParams = new FormData();
    queryParams.append("date_start", date_start);
    queryParams.append("date_end", date_end);

    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-api-key": "bGlO1IKqI56ebzJCFNlkaMH90HiXgVY4tbF8tiS0",
      },
    };

    axios
      .get(
        "https://nwfifkz4t8.execute-api.us-east-1.amazonaws.com/testdata/invoices?date_start=2022-05-06&date_end=2022-05-20",
        config
      )
      .then((res) => {
        // Si la respuesta es correcta guarda las facturas en estado
        if (res.status === 200) {
          setInvoices(res.data.invoices);
        }
      })
      .catch(() => {});
  }

  // Functión para cambiar el orden de los datos dependiendo de los casos disponibles
  function changeOrder(newOrder) {
    switch (newOrder) {
      case "0":
        setInvoices((prevState) =>
          prevState.sort((a, b) => {
            if (a.invoice_number > b.invoice_number) return 1;
            if (a.invoice_number < b.invoice_number) return -1;
            return 0;
          })
        );
        break;
      case "1":
        setInvoices((prevState) =>
          prevState.sort((a, b) => {
            if (a.invoice_number > b.invoice_number) return -1;
            if (a.invoice_number < b.invoice_number) return 1;
            return 0;
          })
        );
        break;
      case "2":
        setInvoices((prevState) =>
          prevState.sort((a, b) => {
            if (a.total > b.total) return 1;
            if (a.total < b.total) return -1;
            return 0;
          })
        );
        break;
      case "3":
        setInvoices((prevState) =>
          prevState.sort((a, b) => {
            if (a.total > b.total) return -1;
            if (a.total < b.total) return 1;
            return 0;
          })
        );
        break;
      case "4":
        setInvoices((prevState) =>
          prevState.sort((a, b) => {
            if (a.invoice_date > b.invoice_date) return 1;
            if (a.invoice_date < b.invoice_date) return -1;
            return 0;
          })
        );
        break;
      case "5":
        setInvoices((prevState) =>
          prevState.sort((a, b) => {
            if (a.invoice_date > b.invoice_date) return -1;
            if (a.invoice_date < b.invoice_date) return 1;
            return 0;
          })
        );
        break;
      default:
        // Si no hay un orden establecido, se llama a la función para obtener el orden inicial
        getInvoices(dateStart, dateEnd);
        break;
    }
  }

  // El componente se re-renderiza solo caundo cambia un filtro o el orden
  useEffect(() => {}, [filter, order]);

  return (
    <div className="bg-contalink-50 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:p-0">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", duration: 1, delay: 0 }}
          className='text-contalink-200 font-bold text-4xl mb-4 text-center'
        >
          Cristopher D. Chavez - Contalink
        </motion.h1>
        {/* Select Date Form */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", duration: 1, delay: 0 }}
          className="bg-white rounded-2xl p-4 shadow border flex flex-col md:flex-row align-center justify-between gap-8 max-w-3xl mx-auto"
          onSubmit={(event) => handleSubmit(event)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 1, delay: 0 }}
          >
            <p className="text-contalink-600 font-bold text-xl mb-4">
              Seleccione la fecha de inicio y final
            </p>
            <div className="flex flex-col md:flex-row align-center gap-2">
              <input
                type="date"
                name="date_start"
                id="date_start"
                className="border border-neutral-300 p-2 rounded-lg bg-neutral-100"
                value={dateStart}
                onChange={(event) => setDateStart(event.target.value)}
              />
              <span className="flex items-center justify-center">a:</span>
              <input
                type="date"
                name="date_end"
                id="date_end"
                className="border border-neutral-300 p-2 rounded-lg bg-neutral-100"
                value={dateEnd}
                onChange={(event) => setDateEnd(event.target.value)}
              />
            </div>
          </motion.div>
          <div className="flex items-center justify-end">
            <input
              className=" bg-contalink-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-150 hover:cursor-pointer hover:bg-contalink-600 btn-disabled"
              type="submit"
              disabled={!dateStart || !dateEnd}
              value="Obtener facturas"
            />
          </div>
        </motion.form>

        {/* Grid Data */}
        {invoices && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            transition={{ type: "spring", duration: 1, delay: 0 }}
            className="mt-16 md:mt-32"
          >
            {/* Barra de búsqueda, filtros y orden */}
            <div className="bg-contalink-50 z-50 sticky top-0 py-4 sm:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2 h-12">
                <div className="relative h-full">
                  <input
                    type="text"
                    className="bg-white rounded-lg pl-4 pr-16 py-3 border absolute top-0 bottom-0 left-0 right-0"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                  <button className="rounded-lg text-contalink-500 absolute top-0 bottom-0 right-0 w-12">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end">
                Filtrar por:
                <select
                  className="ml-4 p-2 rounded-lg"
                  defaultValue={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <option value="">Sin filtros</option>
                  <option value="Cancelado">Cancelados</option>
                  <option value="Vigente">Vigentes</option>
                </select>
              </div>
              <div className="flex justify-end items-center">
                Ordenar por:
                <select
                  className="ml-4 p-2 rounded-lg"
                  defaultValue={order}
                  onChange={(event) => {
                    changeOrder(event.target.value);
                    setOrder(event.target.value);
                  }}
                >
                  <option value="">Sin orden</option>
                  <option value="0">Número de factura ⬆</option>
                  <option value="1">Número de factura ⬇</option>
                  <option value="2">Total ⬆</option>
                  <option value="3">Total ⬇</option>
                  <option value="4">Más antiguos</option>
                  <option value="5">Más recientes</option>
                </select>
              </div>
            </div>

            {/* Tabla principal de información */}
            <div
              className={`grid grid-cols-1 ${
                !listOrder && "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              } gap-8 mt-8`}
            >
              {invoices &&
                invoices.map((invoice, index) => {
                  // Si hay una cantidad establecida se asegura que solo se rendericen los elementos correspondientes
                  if (min <= index && min + max > index) {
                    if (filter) { // Se estableció un filtro
                      if (filter === invoice.status) { // Si el filtro coincide con el estado entonces lo muesrta
                        return (
                          <InvoiceCard
                            key={invoice.id}
                            total={invoice.total}
                            status={invoice.status}
                            date={invoice.invoice_date}
                            number={invoice.invoice_number}
                          />
                        );
                      }
                      // Si el filtro no coincide con el estado, entonces no renderiza nada, pero ejecuta return para no continuar con la función
                      return "";
                    }

                    // Si hay un parámetro de búsqueda, compara con todas las posibilidades para no complicar al usuario
                    if (search) {
                      if (
                        invoice.invoice_number
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        invoice.invoice_date
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        invoice.status
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        invoice.total
                          .toString()
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return (
                          <InvoiceCard
                            key={invoice.id}
                            total={invoice.total}
                            status={invoice.status}
                            date={invoice.invoice_date}
                            number={invoice.invoice_number}
                          />
                        );
                      }
                      return "";
                    }

                    // Si no hay filtros ni búsquedas, simplemente muestra todos los elementos
                    return (
                      <InvoiceCard
                        key={invoice.id}
                        total={invoice.total}
                        status={invoice.status}
                        date={invoice.invoice_date}
                        number={invoice.invoice_number}
                      />
                    );
                  }

                  // Si el elemeto está fuera del rango de min y max, entonces no lo renderiza
                  return "";
                })}
            </div>

            {/* Controles de navegación */}
            <div className="bg-contalink-50 py-4 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              <div className="flex items-center lg:col-span-2 xl:col-span-3">
                <button
                  className="btn-primary mr-4"
                  onClick={() => setListOrder(true)}
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
                <button
                  className="btn-primary mr-4"
                  onClick={() => setListOrder(false)}
                >
                  <FontAwesomeIcon icon={faTableCellsLarge} />
                </button>

                <div className="py-4 md:py-0">
                  Ver{" "}
                  <select
                    className="form-input mr-2"
                    defaultValue={max}
                    onChange={(event) => setMax(parseInt(event.target.value))}
                  >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value={invoices.length}>Todo</option>
                  </select>
                  Resultados entre {min} y{" "}
                  {min + max <= invoices.length ? min + max : invoices.length}
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end">
                <button
                  className="bg-contalink-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-150 hover:cursor-pointer hover:bg-contalink-600 btn-disabled"
                  disabled={min + max <= max ? true : false}
                  onClick={() =>
                    setMin((prevState) =>
                      prevState - max > 0 ? prevState - max : 0
                    )
                  }
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  className="bg-contalink-500 text-white ml-4 py-3 px-6 rounded-lg font-medium transition-all duration-150 hover:cursor-pointer hover:bg-contalink-600 btn-disabled"
                  disabled={invoices.length <= min + max ? true : false}
                  onClick={() =>
                    setMin((prevState) =>
                      prevState + max < invoices.length
                        ? prevState + max
                        : invoices.length - max
                    )
                  }
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* No se han buscado facturas */}
        {!invoices && (
          <>
            <div className="max-w-sm mx-auto">
              <h2 className="text-contalink-500 font-medium text-2xl text-center mt-16">
                Al parecer todavía no realizas una búsqueda, prueba ingresando
                dos fechas.
              </h2>
              <NoSearch className="max-w-full" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
