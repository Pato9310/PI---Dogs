import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBreed } from "../../Actions";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
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

    if (Object.values(errors).length > 0) {
      alert("Please complete the information required");
    } else if (
      form.name === "" &&
      form.min__height === "" &&
      form.max__height === "" &&
      form.min__weight === "" &&
      form.max__weight === "" &&
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

  const handleSelect = (event) => {
    const { value } = event.target;
    setForm({
      ...form,
      temperament: [...form.temperament, value],
    });
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleDelete,
    handleSelect,
  };
};
