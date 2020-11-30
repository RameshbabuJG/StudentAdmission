import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAll, Delete } from "./../actions/SudentsActions";
import { fetchAll as fetchDepartment } from "./../actions/departmentActions";
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
import StudentForm from "./StudentForm";
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

function StudentList({ classes, ...props }) {

    
    const [currentID, setCurrentID] = useState(0);
    const [currentLength, setCurrentLength] = useState(false);
    
    const [list, setList] = useState([]);
    const { addToast } = useToasts();
    const [isRendered,setIsRendered] = useState(props.isRender);
    const [state, setState] = useState("loading (4 sec)...");
    useEffect(() => {
        
        
          if(!isRendered)
            props.fetchAllStudents();
            //isRendered = false;
        
       
        return () => {
            
            setIsRendered(true);
        };
 
    }, [props]); //componentDidMount
    if(currentLength < 1) {
        setTimeout(() => {
            setCurrentLength(currentLength + 1);
        }, 1000);
      }
    function supprimer(id) {
        debugger
        props.deleteStudent(id, () => addToast("Deleted successfully", { appearance: "info" })
        );
        props.fetchAllStudents();
        setIsRendered(false);
    }

    return (
        // <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <StudentForm {...{ currentID, setCurrentID }} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>age</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.list.map((c, i) => {
                                    
                                    return (
                                        <TableRow key={i} hover>
                                            <TableCell>{c.name}</TableCell>
                                            <TableCell>{c.age}</TableCell>
                                            <TableCell>
                                                {c.department}
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
         //</Paper>
    );
}

function mapStateToProps(state) {
    return ({
        ...state.list,
        ...state.isRendered,
        ...state.departmentlist
    });
}

/*const mapDispatchToProps = () => ({
    fetchAll
});*/

const mapActionToProps = {
    fetchAllStudents: fetchAll,
    deleteStudent: Delete,
    fetchDepartmentAll: fetchDepartment
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(StudentList);
