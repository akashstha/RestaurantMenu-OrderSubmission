import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();
  const [formValues, setFormValues] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enterName = nameRef.current.value;
    const enterStreet = streetRef.current.value;
    const enterPostal = postalRef.current.value;
    const enterCity = cityRef.current.value;

    const enterNameValidation = !isEmpty(enterName);
    const enterStreetValidation = !isEmpty(enterStreet);
    const enterPostalValidation = isFiveChars(enterPostal);
    const enterCityValidation = !isEmpty(enterCity);
    setFormValues({
      name: enterNameValidation,
      street: enterStreetValidation,
      postal: enterPostalValidation,
      city: enterCityValidation,
    });
    const formValidation = enterNameValidation && enterStreetValidation && enterPostalValidation && enterCityValidation;
    if (!formValidation) {
      return;
    }
    props.orderSubmitHandler({
      name: enterName,
      street: enterStreet,
      postal: enterPostal,
      city: enterCity,
    });
  };

  const nameStyle = `${classes.control} ${formValues.name ? "" : classes.invalid}`;
  const streetStyle = `${classes.control} ${formValues.street ? "" : classes.invalid}`;
  const postalStyle = `${classes.control} ${formValues.postal ? "" : classes.invalid}`;
  const cityStyle = `${classes.control} ${formValues.city ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameStyle}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValues.name && <p>Please enter correct name!</p>}
      </div>
      <div className={streetStyle}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValues.street && <p>Please enter correct Street!</p>}
      </div>
      <div className={postalStyle}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!formValues.postal && <p>Please enter correct Postal Code!</p>}
      </div>
      <div className={cityStyle}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValues.city && <p>Please enter correct City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
