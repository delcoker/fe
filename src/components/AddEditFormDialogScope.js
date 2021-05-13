import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid } from "@material-ui/core";
import { AddCircleOutline as AddIcon, Edit as EditIcon, } from "@material-ui/icons";
import useStyles from "../_helpers/use_styles/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { categoryService } from "../_services/category.service";

// const endpoint =
// 	process.env.NODE_ENV === "development"
// 		? process.env.REACT_APP_URL_DEV
// 		: process.env.REACT_APP_URL_PROD;

export default function AddEditFormDialog(props) {
		const setRowData = props.setRowData;
		const rowData = props.rowData;
		// const data = props.data;
		const setData = props.setData;
		const filteredData = props.filteredData;
		const setFilteredData = props.setFilteredData;

		const classes = useStyles();
		const [loading, setLoading] = React.useState(false);

		const groupCategoryId = 3;

		const saveNew = (e) => {
				setLoading(true);

				const params = {
						name: e.target.Category.value,
						group_category_id: groupCategoryId,
						keywords: e.target.Keywords.value,
				}

				categoryService.create(params)
					.then(function (response) {
							setLoading(false);
							alert(`${params.name} saved`);

							let newRowData = {};
							newRowData.category_name = response.category_name;
							newRowData.group_category_id = response.group_category_id;
							newRowData.keywords = response.keywords[0].keywords
							newRowData.id = response.id;
							newRowData.name = response.category_name;

							const newFilteredData = [...filteredData, newRowData];
							setData(newFilteredData);
							setFilteredData(newFilteredData);

							props.onClose();
					})
					.catch(function (error) {
							setLoading(false);
							console.log(error);
					});
		};

		const edit = (e) => {
				setLoading(true);

				const params = {
						name: e.target.Category.value,
						group_category_id: groupCategoryId,
						category_id: e.target.id.value,
						keywords: e.target.Keywords.value,
				}

				categoryService.update(params)
					.then(function (response) {
							setLoading(false);
							alert(`${params.name} updated`);

							let newRowData = {};
							newRowData.category_name = params.name;
							newRowData.group_category_id = params.group_category_id;
							newRowData.keywords = params.keywords;
							newRowData.id = parseInt(params.category_id);
							newRowData.name = params.name;

							let newFilteredData = [...filteredData];

							for (let i = 0; i < newFilteredData.length; i++) {
									if (newFilteredData[i].id === newRowData.id) {
											newFilteredData[i] = JSON.parse(JSON.stringify(newRowData));
											break;
									}
							}

							setFilteredData(newFilteredData);
							props.onClose();
					})
					.catch(function (error) {
							setLoading(false);
							console.log(error);
					});
		};

		const dropDownData = () => {
				if (rowData && rowData.length > 0) {
						// <>	<option aria-label="None" value=""/>
						rowData && rowData.map(
							(rowData) => (
								<option value={rowData["id"]}>{rowData["name"]}</option>
							)
						)
				}
		}

		return (
			<div>
					<Dialog
						open={props.open}
						onClose={props.onClose}
						aria-labelledby="form-dialog-title"
						maxWidth={"sm"}
						keepMounted
						onExit={props.onClose}
					>
							<DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
							<DialogContent>
									<form
										noValidate
										autoComplete="on"
										onSubmit={(e) => {
												e.preventDefault();
												(props.addOrEdit === "Add") ? saveNew(e) : edit(e);
										}}
									>
											<Grid
												container
												spacing={3}
												justify="space-around"
											>
													<TextField
														required
														disabled
														inputProps={{type: "hidden"}}
														name="id"
														value={
																rowData && rowData["id"]
																	? rowData["id"] : ""
														}
													/>

													{props.showDropDown &&
													<Grid item xs={12} sm={12}>

															<FormControl required className={classes.formControl} fullWidth>
																	<InputLabel htmlFor="age-native-required">{props.showDropDown}</InputLabel>
																	<Select
																		native
																		value={
																				rowData && rowData["id"]
																					? rowData["id"] : ""
																		}
																		onChange={(e) => {
																				const attribute = rowData["id"]
																					? {"id": e.target.value,}
																					: {"id": e.target.value,};
																				setRowData({...rowData, ...attribute,});
																				console.log(rowData)
																				console.log(attribute)
																		}}
																		name={props.showDropDown}
																		inputProps={{
																				id: 'age-native-required',
																		}}
																	>
																			<option aria-label="None" value=""/>
																			{dropDownData()}


																	</Select>
																	<FormHelperText>Required</FormHelperText>
															</FormControl>
													</Grid>}


													{props.showTextField1 &&
													<Grid item xs={12} sm={12}>
															<TextField
																required
																label={props.showTextField1}
																color="primary"
																fullWidth
																autoComplete="name"
																name={props.showTextField1}
																inputProps={{
																		className: classes.input,
																}}
																value={
																		rowData && rowData["name"]
																			? rowData["name"] : ""
																}
																onChange={(e) => {
																		const attribute = rowData["name"]
																			? {"name": e.target.value,}
																			: {"name": e.target.value,};
																		setRowData({...rowData, ...attribute,});
																}}
															/>
													</Grid>}


													{props.showTextField2 &&
													<Grid item xs={12} sm={12}>
															<TextField
																required
																label={props.showTextField2}
																color="primary"
																fullWidth
																autoComplete="keywords"
																name={props.showTextField2}
																inputProps={{
																		className: classes.input,
																}}
																multiline
																value={
																		rowData && rowData["keywords"]
																			? rowData["keywords"]
																			: ""
																}
																onChange={(e) => {
																		const attribute = rowData["keywords"]
																			? {"keywords": e.target.value,}
																			: {"keywords": e.target.value,};
																		setRowData({
																				...rowData, ...attribute,
																		});
																}}
															/>
													</Grid>}

													<Grid item xs={12} sm={9}>
															<Button
																fullWidth
																type="submit"
																color="primary"
																variant="contained"
																endIcon={
																		props.addOrEdit === "Edit" ? (
																			<EditIcon/>
																		) : (
																			<AddIcon/>
																		)
																}
															>
																	Confirm {props.addOrEdit}
															</Button>
													</Grid>
											</Grid>
									</form>
							</DialogContent>
							<DialogActions>
									<Button onClick={props.onClose} color="primary">
											Close
									</Button>
							</DialogActions>
					</Dialog>
			</div>
		);
}
