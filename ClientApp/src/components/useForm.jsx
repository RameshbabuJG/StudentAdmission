import { useState } from "react";

function useForm(initialFieldValues, setCurrentID, validate) {
debugger
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    function onChangeHandler(e) {
        
        const { name, value } = e.target;
        const fieldValue = { [name]: value };
        setValues({ ...values, ...{ [name]: value } });
        validate(fieldValue);
    }

    const resetForm = () => {
        setValues({ ...initialFieldValues });
        setErrors({});
        setCurrentID(0);
    };

    return {
        values,
        setValues,
        setErrors,
        errors,
        onChangeHandler,
        resetForm
    };
}

export default useForm;
