import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    Grid,
    TextField,
    withStyles,
    Button} from "@material-ui/core";
import useForm from "./useFormDepartment";
import { create, update } from "../actions/departmentActions";
import { useToasts } from "react-toast-notifications";


function styles(theme) {
    return ({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
                minWidth: 230
            }
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 230
        },
        smMargin: {
            margin: theme.spacing(1)
        }
    });
}

function DepartmentForm({ classes, ...props }) {
    debugger
    const { addToast } = useToasts();
    const initialFieldValues = {
        departmentName: "",
        hodname: "",
        allowedAdmissionCount: ""
    };
    function validate(fieldValues = values) {
        let temp = { ...errors };
        if ("departmentName" in fieldValues)
            temp.departmentName = fieldValues.departmentName ? "" : "this field is required.";

        if ("hodname" in fieldValues)
            temp.hodname = fieldValues.hodname
                ? ""
                : "this field is required.";
        if ("allowedAdmissionCount" in fieldValues)
            temp.allowedAdmissionCount = fieldValues.allowedAdmissionCount ? "" : "this field is required.";
        setErrors({ ...temp });
        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    }
    const {
        values,
        setValues,
        onChangeHandler,
        setErrors,
        errors,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentID, validate);

    function handleSubmit(e) {
        e.preventDefault();
        
        if (validate()) {
            function onSuccess() {
                resetForm();
                addToast("Submitted successfully", { appearance: "success" });
                //   useForm();
            }

            if (props.currentID === 0)
                props.createDepartment(values, onSuccess);

            else
                props.updateDepartment(props.currentID, values, onSuccess);
        }
    }

    useEffect(() => {
        if (props.currentID !== 0) {
            setValues({
                ...props.departmentlist.find((x) => x.id === props.currentID)
            });
            setErrors({});
        }
    }, [props.currentID]);

    return (
        <form
            autoComplete="off"
            noValidate
            className={classes.root}
            onSubmit={handleSubmit}
        >
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="departmentName"
                        variant="outlined"
                        label="Department"
                        value={values.departmentName}
                        onChange={onChangeHandler}
                        {...(errors.departmentName && {
                            error: true,
                            helperText: errors.departmentName
                        })}
                    ></TextField>
                    <TextField
                        name="hodname"
                        variant="outlined"
                        label="hodname"
                        value={values.hodname}
                        onChange={onChangeHandler}
                        {...(errors.hodname && {
                            error: true,
                            helperText: errors.hodname
                        })}
                    ></TextField>

                </Grid>
                <Grid item xs={6}>
    
        
                    <TextField
                        name="allowedAdmissionCount"
                        variant="outlined"
                        label="allowedAdmissionCount"
                        value={values.allowedAdmissionCount}
                        onChange={onChangeHandler}
                        {...(errors.allowedAdmissionCount && {
                            error: true,
                            helperText: errors.allowedAdmissionCount
                        })}
                    ></TextField>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                                                Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={() => resetForm()}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

function mapStateToProps(state) {
    return ({
        ...state.departmentlist
    });
}

const mapActionToProps = {
    createDepartment: create,
    updateDepartment: update
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(DepartmentForm));
