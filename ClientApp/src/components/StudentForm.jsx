import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import {
    Grid,
    TextField,
    withStyles,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Button,
    FormHelperText
} from "@material-ui/core";
import useForm from "./useForm";
import { create, update } from "../actions/SudentsActions";
import { useToasts } from "react-toast-notifications";
import { fetchAll as fetchDepartment } from "./../actions/departmentActions";

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

function StudentForm({ classes, ...props }) {
    const { addToast } = useToasts();
    const [department, setDepartment] = useState([]);
    const initialFieldValues = {
        name: "",
        age: "",
        department: "",
        dateOfAdmission: "",
        tutionFees: ""
    };
    function validate(fieldValues = values) {
        let temp = { ...errors };
        if ("name" in fieldValues)
            temp.name = fieldValues.name ? "" : "this field is required.";
        if ("age" in fieldValues)
            temp.age = fieldValues.age ? "" : "this field is required.";
        if ("department" in fieldValues){
            temp.department = fieldValues.department
                ? ""
                : "this field is required.";
                setDepartment(fieldValues.department);
            }
        if ("dateOfAdmission" in fieldValues)
                temp.dateOfAdmission = fieldValues.dateOfAdmission ? "" : "this field is required.";
        if ("tutionFees" in fieldValues)
            temp.tutionFees = fieldValues.tutionFees
                ? ""
                : "Email is not valid.";
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
          let allowedAdmissionCount = 0;
          let studentCount = 1;
            props.departmentlist.map((c, i) => { 
                if(c.departmentName == values.department)
                {
                    allowedAdmissionCount =  c.allowedAdmissionCount;
                }
            });
            props.list.map((c, i) => { 
                if(c.department == values.department)
                {
                    studentCount++;
                }
            });
            debugger
            if (props.currentID === 0) {
              if(studentCount <= allowedAdmissionCount) {
                props.createStudent(values, onSuccess);
              }
              else {
              addToast("Can't exceeded more than admission", { appearance: "error" });
              }
            }
            else
                props.updateStudent(props.currentID, values, onSuccess);
        }
    }

    useEffect(() => {
        if (props.currentID !== 0) {
            setValues({
                ...props.list.find((x) => x.id === props.currentID)
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
                        name="name"
                        variant="outlined"
                        label="Full Name"
                        value={values.name}
                        onChange={onChangeHandler}
                        {...(errors.name && {
                            error: true,
                            helperText: errors.name
                        })}
                    ></TextField>
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={onChangeHandler}
                        {...(errors.age && {
                            error: true,
                            helperText: errors.age
                        })}
                    ></TextField>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        {...(errors.department && {
                            error: true,
                            helperText: errors.department
                        })}
                    >
                        <InputLabel>Department</InputLabel>
                        
                        <Select
                            name="department"
                            value={values.department}
                            onChange={onChangeHandler}
                        >
                            <MenuItem value="">Select Department</MenuItem>
                              {props.departmentlist.map((c, i) => {
                                  debugger
                              return (
                      
                            <MenuItem value= {c.departmentName}> {c.departmentName}</MenuItem>
                            );
                        })}
                        </Select>
                        {errors.department && (
                            <FormHelperText>{errors.department}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="dateOfAdmission"
                        variant="outlined"
                        label="DateOfAdmission"
                        type="date"
                        value={values.dateOfAdmission}
                        onChange={onChangeHandler}
                        {...(errors.dateOfAdmission && {
                            error: true,
                            helperText: errors.dateOfAdmission
                        })}
                    ></TextField>
        
                    <TextField
                        name="tutionFees"
                        variant="outlined"
                        label="TutionFees"
                        value={values.tutionFees}
                        onChange={onChangeHandler}
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
        ...state.list,
        ...state.departmentlist
    });
}

const mapActionToProps = {
    createStudent: create,
    updateStudent: update,
    fetchDepartmentAll: fetchDepartment
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(StudentForm));
