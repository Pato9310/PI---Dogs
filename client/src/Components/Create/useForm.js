import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBreed } from "../../Actions";

const initialForm = {
  name: "",
  min__height: "",
  max__height: "",
  min__weight: "",
  max__weight: "",
  life__span: "",
  temperament: [],
};

const validateForm = (form) => {
  let errors = {};
  if (!form.name) {
    errors.name = "You must complete the 'Name' field.";
  } else if (!/[a-zA-Z\s]/.test(form.name)) {
    errors.name = "The 'Name' field allows only letters.";
  } else if (!form.min__height) {
    errors.min__height = "You must complete the 'Min height' field.";
  } else if (!form.max__height) {
    errors.max__height = "You must complete the 'Max height' field.";
  } else if (!form.min__weight) {
    errors.min__weight = "You must complete the 'Min weight' field.";
  } else if (!form.max__weight) {
    errors.max__weight = "You must complete the 'Max weight' field.";
  } else if (!form.life__span) {
    errors.life__span = "You must complete the 'Life span' field.";
  } else if (form.temperament.length === 0) {
    errors.temperament = "You must complete the 'Temperament' field.";
  }
  return errors;
};

export const useForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    name === "temperament"
      ? setForm({
          ...form,
          temperament: [...form.temperament, value],
        })
      : setForm({
          ...form,
          [name]: value,
        });
  };

  const handleBlur = (event) => {
    handleChange(event);
    setErrors(validateForm(form));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateForm(form));

    // Controlo si existen errores
    if (Object.values(errors).length > 0) {
      alert("Please complete the information required");
    } else if (
      form.name === "" ||
      form.min__height === "" ||
      form.max__height === "" ||
      form.min__weight === "" ||
      form.max__weight === "" ||
      !form.temperament.length
    ) {
      alert("Please complete the form");
    } else {
      dispatch(createBreed(form));
      alert("Breed created");
      setForm(initialForm);
      navigate("/home");
    }
  };

  const handleDelete = (input) => {
    setForm({
      ...form,
      temperament: form.temperament.filter(
        (temperament) => temperament !== input
      ),
    });
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleDelete,
  };
};
