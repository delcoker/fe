import React, {useEffect, useState} from "react";
// react component that copies the given text inside your clipboard
// @material-ui/core components
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
// core components
import AddEditFormDialogScope from "./AddEditFormDialogScope";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DataTable from "react-data-table-component";
import ActionComponent from "./ActionComponent";
import useStyles from "../_helpers/use_styles/styles";
import {scopeService} from "../_services/scope.service";
import memoize from "memoize-one";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import AlertPopUp from "./snackbars/AlertPopUp";
import {AlertType} from "../_services";

const columns = [
    {
        name: "id",
        selector: (scope) => scope.id,
        sortable: true,
        omit: true,
    },
    {
        name: "Scopes",
        selector: "name",
        sortable: true,
        wrap: true,
    },
];


const ScopesComponent = (props) => {
    // const classes = useStyles();
    // const [switchTheme, setSwitchTheme] = useState("dark");
    const [filterText, setFilterText] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([{}]);
    const [open, setOpen] = useState(false);
    // const [dialogType, setDialogType] = useState("");
    const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
    const [addOrEdit, setAddOrEdit] = useState("Add");
    const [rowData, setRowData] = useState();
    const [showDropDown, setShowDropDown] = useState("Scope");
    const [showTextField1, setShowTextField1] = useState("Scope");
    const [showTextField2, setShowTextField2] = useState("Scope");

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleClearSelectedRows, setToggleClearSelectedRows] = useState(false);

    // const [alertMessage, setAlertMessage] = useState("");
    // const [alertOpen, setAlertOpen] = useState(false);
    // const [alertType, setAlertType] = useState("");

    const handleClear = () => {
        setFilterText("");
        setFilteredData(data);
    };

    const actions = (type) =>
        (
            <ActionComponent
                onFilter={(e) => {
                    const text = e.target.value;
                    setFilterText(text);
                    setFilteredData(
                        data.filter(
                            (data) =>
                                (data["name"] && data["name"]
                                    .toLowerCase()
                                    .includes(text.toLowerCase()))
                        )
                    );
                }}
                onClear={handleClear}
                filterText={filterText}
                onClick={() => {
                    addOrEditPresets({}, "Add", type, "", "Scope", false);
                }}
                tooltip={`add a new category`}
                placeholder={"filter by scope"}
            />
        );

    const contextActions = memoize((deleteHandler) => (
        <IconButton onClick={deleteHandler}>
            <Delete color="primary"/>
        </IconButton>
    ));

    const handleSelectedRows = (sel) => {
        setSelectedRows(sel.selectedRows);
    }

    const deleteSelectedRows = data => {
        selectedRows.forEach(selectedRow => {
            const params = {
                filteredData,
                selectedRow
            }

            scopeService.delete(params)
                .then((response) => {
                    props.setAlertOpen(true);
                    props.setAlertMessage(`${response.message}`);
                    props.setAlertType(AlertType.WARNING);
                    setFilteredData(response.filteredData);
                    setData(response.filteredData);
                })
        });
        setToggleClearSelectedRows(!toggleClearSelectedRows);
    };

    const addOrEditPresets = (row, crudType, categoryType, showDropDown, showTextField1, showTextField2) => {
        setOpen(!open);
        setAddOrEdit(crudType);
        // setCategoryType(categoryType);
        setShowDropDown(showDropDown);
        setShowTextField1(showTextField1)
        setShowTextField2(showTextField2);
        setRowData(row);
    };

    const handleOnRowClicked = (row, editCategory, showDropDown, showTextField1, showTextField2) => {
        addOrEditPresets(row, "Edit", editCategory, showDropDown, showTextField1, showTextField2);
        setExpandOnRowClick(!expandOnRowClick);
    };

    useEffect(() => {
        scopeService.getAll()
            .then(data => {
                // console.log(data)
                setData(data);
                setFilteredData(data);
            });

    }, []);

    return (
        <>
            <Grid container spacing={3} justify="space-between">
                {/*<AlertPopUp*/}
                {/*    alertOpen={alertOpen}*/}
                {/*    setAlertOpen={setAlertOpen}*/}
                {/*    alertMessage={alertMessage}*/}
                {/*    alertType={alertType}*/}
                {/*/>*/}
                <AddEditFormDialogScope
                    open={open}
                    onClose={() => setOpen(false)}
                    title={
                        `${addOrEdit} Scope`
                    }
                    addOrEdit={addOrEdit}
                    rowData={rowData}
                    setRowData={setRowData}
                    data={data}
                    setData={setData}
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                    showDropDown={showDropDown}
                    showTextField1={showTextField1}
                    showTextField2={showTextField2}

                    setAlertMessage={props.setAlertMessage}
                    setAlertOpen={props.setAlertOpen}
                    setAlertType={props.setAlertType}
                />

                <Grid item xs={12}>
                    <br/>
                    <br/>

                    <DataTable
                        defaultSortField={"name"}
                        keyField={"datatable"}
                        title="Let's listen 👂🏿"
                        columns={columns}
                        data={filteredData}
                        theme={props.theme}
                        highlightOnHover
                        pointerOnHover
                        pagination
                        // selectableRows
                        expandableRows
                        actions={actions(null)}
                        onRowClicked={(row) =>
                            handleOnRowClicked(row, "Category", false, "Scope", false)
                        }
                        expandOnRowClicked={false}
                        expandableRowsComponent={<></>}
                        // dense
                        customStyles={props.customStyles}
                        contextActions={contextActions(deleteSelectedRows)}
                        onSelectedRowsChange={handleSelectedRows}
                        striped
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default ScopesComponent;
