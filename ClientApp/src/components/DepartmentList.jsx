import React, { useState, useEffect,useSelector } from "react";
import { connect } from "react-redux";
import { fetchAll, Delete } from "./../actions/departmentActions";
import {
    Grid,
    Paper,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    withStyles,
    Button,
    ButtonGroup
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DepartmentForm from "./DepartmentForm";
import { useToasts } from "react-toast-notifications";

function styles(theme) {
    return ({
        root: {
            "& .MuiTableCell-head": {
                fontSize: "1.25rem"
            }
        },
        paper: {
            margin: theme.spacing(2),
            padding: theme.spacing(2)
        }
    });
}

function DepartmentList({ classes, ...props }) {

    debugger
    const [currentID, setCurrentID] = useState(0);
    const [departmentlist, setDepartmentlist] = useState([]);
    const { addToast } = useToasts();
    const [status, setStatus] = useState(props.status);
    //const isLoad = useSelector(state => state.status);
    useEffect(() => {
        debugger
        if(!status)
            props.fetchAllDepartment();
        return() => {
            setStatus(true);
        }
    }, [props]); //componentDidMount

    function supprimer(id) {
        debugger
        props.deleteDepartment(id, () => addToast("Deleted successfully", { appearance: "info" })
        );
        props.fetchAllDepartment();
        setStatus(false);
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DepartmentForm {...{ currentID, setCurrentID }} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Department</TableCell>
                                    <TableCell>HOD</TableCell>
                                    <TableCell>Admissioncount</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.departmentlist.map((c, i) => {
                                    debugger
                                    return (
                                        <TableRow key={i} hover>
                                            <TableCell>{c.departmentName}</TableCell>
                                            <TableCell>{c.hodname}</TableCell>
                                            <TableCell>
                                                {c.allowedAdmissionCount}
                                            </TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button>
                                                        <EditIcon
                                                            color="primary"
                                                            onClick={() => { setCurrentID(c.id); } } />
                                                    </Button>
                                                    <Button>
                                                        <DeleteIcon
                                                            color="secondary"
                                                            onClick={() => supprimer(c.id)} />
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

function mapStateToProps(state) {
    return ({
        ...state.departmentlist,
        ...state.status
    });
}

/*const mapDispatchToProps = () => ({
    fetchAll
});*/

const mapActionToProps = {
    fetchAllDepartment: fetchAll,
    deleteDepartment: Delete
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(DepartmentList));
