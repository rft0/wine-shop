import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { useDispatch } from "react-redux";

import { payCard } from "../redux/actions/products";
import "./paypage.css";

function CreditCardForm() {
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [numberDirty, setNumberDirty] = useState("");
  const [name, setName] = useState("");
  const [nameDirty, setNameDirty] = useState("");
  const [nameError, setNameError] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryDirty, setExpiryDirty] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [cvcDirty, setCvcDirty] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if ((nameError, numberError, expiryError, cvcError)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [nameError, numberError, expiryError, cvcError]);

  const formHandler = (event) => {
    event.preventDefault();
    const id = nanoid(5);
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    alert("Your order is paid");
    console.log("pay");

    axios({
      method: "post",
      url: "http://localhost:4000/cards",
      data: {
        id,
        number,
        name,
        cvc,
        expiry,
      },
    }).then(({ data }) => {
      dispatch(
        payCard({
          id,
          number,
          name,
          expiry,
        })
      );
    });
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;

      case "number":
        setNumberDirty(true);
        break;

      case "expiry":
        setExpiryDirty(true);
        break;

      case "cvc":
        setCvcDirty(true);
        break;

      default:
        break;
    }
  };

  const cvcHandler = (e) => {
    setCvc(e.target.value);
    const regex = /^[1-9]\d{,3}$/;
    if (cvc.length !== 2 && !regex.test(e.target.value)) {
      setCvcError("Please check the cvc number");
    } else {
      setCvcError("");
    }
    //console.log("cvc.length", cvc.length);
  };

  const numberHandler = (e) => {
    setNumber(e.target.value);
    const regex = /^[1-9]\d{,16}$/;
    if (number.length !== 15 && !regex.test(e.target.value)) {
      setNumberError("Please check the card number");
    } else {
      setNumberError("");
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    const regex = /^[a-zA-Z\s]+$/;
    if (
      !regex.test(
        String(e.target.value)
          .replace(/ +/g, " ")
          .trim()
      )
    ) {
      setNameError("Please, enter your name");
    } else {
      setNameError("");
    }
    console.log("e.target.value", e.target.value);
  };

  const expiryHandler = (e) => {
    setExpiry(e.target.value);
    const regex = /(\d{2})\/(\d{2})/;
    let dateNow = new Date();
    let month = +dateNow.getMonth() + 1;
    console.log("month", month);

    if (!regex.test(String(e.target.value))) {
      setExpiryError("Please check the card expiry");
    } else {
      setExpiryError("");
    }
  };

  return (
    <div className="pay-page">
      <h1 className="text-center"> Please enter your credit card</h1>
      <form className="card-wrapper" onSubmit={formHandler}>
        <div className="card-back">
          <div className="card-back-line"> </div>
          {cvcDirty && cvcError && <div className="errorCvc">{cvcError} </div>}
          <label htmlFor="cvc"> </label>
          <input
            className="card-cvc"
            type="text"
            id="cvc"
            name="cvc"
            placeholder="CVC"
            maxLength={3}
            value={cvc}
            onChange={(e) => cvcHandler(e)}
            onBlur={(e) => blurHandler(e)}
          ></input>
        </div>
        <div className="card-front">
          <p className="card-bank">Card of Bank</p>
          <p className="card-logo">Logo</p>
          {nameDirty && nameError && (
            <div className="errorName">{nameError} </div>
          )}
          <label htmlFor="name"> </label>
          <input
            className="card-name"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => nameHandler(e)}
            onBlur={(e) => blurHandler(e)}
          ></input>
          {numberDirty && numberError && (
            <div className="errorNumber">{numberError} </div>
          )}
          <label htmlFor="number"> </label>
          <input
            className="card-number"
            type="text"
            id="number"
            name="number"
            maxLength={16}
            placeholder="Number"
            onChange={(e) => numberHandler(e)}
            onBlur={(e) => blurHandler(e)}
            value={number}
          ></input>
          <div className="expiry-block">
            {expiryDirty && expiryError && (
              <div className="errorExpiry">{expiryError} </div>
            )}
            <label htmlFor="expiry"> </label>
            <input
              className="card-expiry"
              type="text"
              id="expiry"
              name="expiry"
              maxLength={5}
              placeholder="MM/YY"
              onChange={(e) => expiryHandler(e)}
              onBlur={(e) => blurHandler(e)}
            ></input>
          </div>
        </div>
      </form>
      <button
        className="btn-pay"
        size="block"
        id="validateButton"
        type="submit"
        disabled={!isValid}
      >
        Pay
      </button>
    </div>
  );
}

export default CreditCardForm;

// import React, { useState, useEffect } from "react";
// import { nanoid } from "nanoid";
// import axios from "axios";
// import { useDispatch } from "react-redux";

// import { payCard } from "../redux/actions/products";
// import "./paypage.css";

// function CreditCardForm() {
//   const dispatch = useDispatch();
//   const [number, setNumber] = useState("");
//   const [numberError, setNumberError] = useState("");
//   const [numberDirty, setNumberDirty] = useState("");
//   const [name, setName] = useState("");
//   const [nameDirty, setNameDirty] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [expiryMonth, setMonthExpiry] = useState("");
//   const [expiryMonthDirty, setExpiryMonthDirty] = useState("");
//   const [expiryMonthError, setExpiryMonthError] = useState("");
//   const [expiryYear, setYearExpiry] = useState("");
//   const [expiryYearDirty, setExpiryYearDirty] = useState("");
//   const [expiryYearError, setExpiryYearError] = useState("");
//   const [cvc, setCvc] = useState("");
//   const [cvcError, setCvcError] = useState("");
//   const [cvcDirty, setCvcDirty] = useState("");
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     if ((nameError, numberError, expiryMonthError, expiryYearError, cvcError)) {
//       setIsValid(false);
//     } else {
//       setIsValid(true);
//     }
//   }, [nameError, numberError, expiryYearError, expiryMonthError, cvcError]);

//   const formHandler = (event) => {
//     event.preventDefault();
//     const id = nanoid(5);
//     setNumber("");
//     setName("");
//     setMonthExpiry("");
//     setYearExpiry("");
//     setCvc("");
//     alert("Your order is paid");
//     console.log("pay");

//     axios({
//       method: "post",
//       url: "http://localhost:4000/cards",
//       data: {
//         id,
//         number,
//         name,
//         cvc,
//         expiryMonth,
//         expiryYear,
//       },
//     }).then(({ data }) => {
//       dispatch(
//         payCard({
//           id,
//           number,
//           name,
//           expiryMonth,
//           expiryYear,
//         })
//       );
//     });
//   };

//   const blurHandler = (e) => {
//     switch (e.target.name) {
//       case "name":
//         setNameDirty(true);
//         break;

//       case "number":
//         setNumberDirty(true);
//         break;

//       case "expiryMonth":
//         setExpiryMonthDirty(true);
//         break;
//       case "expiryYear":
//         setExpiryYearDirty(true);
//         break;

//       case "cvc":
//         setCvcDirty(true);
//         break;

//       default:
//         break;
//     }
//   };

//   const cvcHandler = (e) => {
//     setCvc(e.target.value);
//     const regex = /^[1-9]\d{,3}$/;
//     if (cvc.length !== 2 && !regex.test(e.target.value)) {
//       setCvcError("Please check the cvc number");
//     } else {
//       setCvcError("");
//     }
//     //console.log("cvc.length", cvc.length);
//   };

//   const numberHandler = (e) => {
//     setNumber(e.target.value);
//     const regex = /^[1-9]\d{,16}$/;
//     if (number.length !== 15 && !regex.test(e.target.value)) {
//       setNumberError("Please check the card number");
//     } else {
//       setNumberError("");
//     }
//   };

//   const nameHandler = (e) => {
//     setName(e.target.value);
//     const regex = /^[a-zA-Z\s]+$/;
//     if (
//       !regex.test(
//         String(e.target.value)
//           .replace(/ +/g, " ")
//           .trim()
//       )
//     ) {
//       setNameError("Please, enter your name");
//     } else {
//       setNameError("");
//     }
//     console.log("e.target.value", e.target.value);
//   };

//   const expiryMonthHandler = (e) => {
//     setMonthExpiry(e.target.value);
//     const regex = /^[1-9]\d{,16}$/;
//     let dateNow = new Date();
//     let month = +dateNow.getMonth() + 1;
//     console.log("month", month);

//     if (!regex.test(String(e.target.value))) {
//       setExpiryMonthError("Please check the card expiry");
//     } else {
//       setExpiryMonthError("");
//     }
//     console.log("expiryMont", month);
//   };

//   const expiryYearHandler = (e) => {
//     setYearExpiry(e.target.value);
//     const regex = /(\d{2})/;
//     let dateNow = new Date();
//     let year = dateNow.getFullYear();
//     console.log("year", year);

//     if (!regex.test(String(e.target.value))) {
//       setExpiryYearError("Please check the card expiry");
//     } else {
//       setExpiryYearError("");
//     }
//   };

//   return (
//     <div className="pay-page">
//       <h1 className="text-center"> Please enter your credit card</h1>
//       <form className="card-wrapper" onSubmit={formHandler}>
//         <div className="card-back">
//           <div className="card-back-line"> </div>
//           {cvcDirty && cvcError && <div className="errorCvc">{cvcError} </div>}
//           <label htmlFor="cvc"> </label>
//           <input
//             className="card-cvc"
//             type="text"
//             id="cvc"
//             name="cvc"
//             placeholder="CVC"
//             maxLength={3}
//             value={cvc}
//             onChange={(e) => cvcHandler(e)}
//             onBlur={(e) => blurHandler(e)}
//           ></input>
//         </div>
//         <div className="card-front">
//           <p className="card-bank">Card of Bank</p>
//           <p className="card-logo">Logo</p>
//           {nameDirty && nameError && (
//             <div className="errorName">{nameError} </div>
//           )}
//           <label htmlFor="name"> </label>
//           <input
//             className="card-name"
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => nameHandler(e)}
//             onBlur={(e) => blurHandler(e)}
//           ></input>
//           {numberDirty && numberError && (
//             <div className="errorNumber">{numberError} </div>
//           )}
//           <label htmlFor="number"> </label>
//           <input
//             className="card-number"
//             type="text"
//             id="number"
//             name="number"
//             maxLength={16}
//             placeholder="Number"
//             onChange={(e) => numberHandler(e)}
//             onBlur={(e) => blurHandler(e)}
//             value={number}
//           ></input>
//           <div className="expiry-block">
//             {expiryMonthDirty && expiryMonth && (
//               <div className="errorExpiry">{expiryMonth} </div>
//             )}
//             <label htmlFor="month"> </label>
//             <input
//               className="card-expiry _month"
//               type="text"
//               id="month"
//               name="month"
//               maxLength={2}
//               placeholder="MM"
//               onChange={(e) => expiryMonthHandler(e)}
//               onBlur={(e) => blurHandler(e)}
//             ></input>
//             <div className="expiry-line">/</div>
//             <label htmlFor="year"> </label>
//             <input
//               className="card-expiry _year"
//               type="text"
//               id="year"
//               name="year"
//               maxLength={2}
//               placeholder="YY"
//               onChange={(e) => expiryYearHandler(e)}
//               onBlur={(e) => blurHandler(e)}
//             ></input>
//           </div>
//         </div>
//       </form>
//       <button
//         className="btn-pay"
//         size="block"
//         id="validateButton"
//         type="submit"
//         disabled={!isValid}
//       >
//         Pay
//       </button>
//     </div>
//   );
// }

// export default CreditCardForm;
