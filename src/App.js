import { useEffect, useState } from "react";
import axios from "axios";

import es from "./Assets/es.json";
import en from "./Assets/en.json";
import InvoiceCard from "./Components/InvoiceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faList,
  faSearch,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [lang, setLang] = useState(en);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [invoices, setInvoices] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(16);
  const [listOrder, setListOrder] = useState(false);

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
    getInvoices(dateStart, dateEnd);
  }

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
        if (res.status === 200) {
          setInvoices(res.data.invoices);
          console.log(res.data.invoices);
        }
      })
      .catch((err) => console.log(err));
  }

  function getLang() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang");
    }
  }

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
        getInvoices(dateStart, dateEnd);
        break;
    }
  }

  useEffect(() => {
    if (getLang() === "es") {
      setLang(es);
    } else {
      setLang(en);
    }
  }, [filter, order]);

  return (
    <div className="bg-contalink-50 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:p-0">
        {/* Select Date Form */}
        <form
          className="bg-white rounded-2xl p-4 shadow border flex flex-col md:flex-row align-center justify-between gap-8 max-w-3xl mx-auto"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div>
            <p className="text-contalink-600 font-bold text-xl mb-4">
              {lang.formTitle}
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
              <span className="flex items-center justify-center">
                {lang.formSeparator}
              </span>
              <input
                type="date"
                name="date_end"
                id="date_end"
                className="border border-neutral-300 p-2 rounded-lg bg-neutral-100"
                value={dateEnd}
                onChange={(event) => setDateEnd(event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <input
              className=" bg-contalink-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-150 hover:cursor-pointer hover:bg-contalink-600"
              type="submit"
              value={lang.formSubmit}
            />
          </div>
        </form>

        {/* Grid Data */}
        {invoices && (
          <div className="mt-16 md:mt-32">
            <div className="bg-contalink-50 z-50 sticky top-0 py-4 sm:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2 h-12">
                <div className="relative h-full">
                  <input
                    type="text"
                    className="bg-white rounded-lg pl-4 pr-16 py-3 border absolute top-0 bottom-0 left-0 right-0"
                    placeholder={lang.searchBar}
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
                {lang.filterBy}
                <select
                  className="ml-4 p-2 rounded-lg"
                  defaultValue={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <option value="">{lang.filterOpt0}</option>
                  <option value="Cancelado">{lang.filterOpt1}</option>
                  <option value="Vigente">{lang.filterOpt2}</option>
                </select>
              </div>
              <div className="flex justify-end items-center">
                {lang.orderBy}
                <select
                  className="ml-4 p-2 rounded-lg"
                  defaultValue={order}
                  onChange={(event) => {
                    changeOrder(event.target.value);
                    setOrder(event.target.value);
                  }}
                >
                  <option value="">{lang.orderOpt0}</option>
                  <option value="0">{lang.orderOpt1}</option>
                  <option value="1">{lang.orderOpt2}</option>
                  <option value="2">{lang.orderOpt3}</option>
                  <option value="3">{lang.orderOpt4}</option>
                  <option value="4">{lang.orderOpt5}</option>
                  <option value="5">{lang.orderOpt6}</option>
                </select>
              </div>
            </div>
            <div
              className={`grid grid-cols-1 ${
                !listOrder && "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              } gap-8 mt-8`}
            >
              {invoices &&
                invoices.map((invoice, index) => {
                  if (min <= index && min + max > index) {
                    if (filter) {
                      if (filter === invoice.status) {
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
                })}
            </div>
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
                  <select className='form-input mr-2' defaultValue={max} onChange={(event) => setMax(parseInt(event.target.value))}>
                    <option value='4'>4</option>
                    <option value='8'>8</option>
                    <option value='16'>16</option>
                    <option value='32'>32</option>
                    <option value='64'>64</option>
                  </select>

                  {lang.showResultsFrom}{" "}
                  {min}{" "}
                  {lang.showResultsTo}{" "}
                  {min + max}
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
                  <FontAwesomeIcon icon={faChevronLeft} /> {lang.controlsPrev}
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
                  {lang.controlsNext} <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
