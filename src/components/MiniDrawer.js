import React from 'react';
import clsx from 'clsx';
import {useTheme} from '@material-ui/core/styles';
import {matchPath} from "react-router";
import {CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,} from '@material-ui/icons';
import {Link, useLocation} from "react-router-dom";

import routes from "../router/routes";
import Header from "./headers/Header";
import useStyles from "../_helpers/use_styles/styles";

export default function MiniDrawer({children, pageTitle, showSubheader}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const MenuItem = ({to, title, icon, selectedPaths}) => {
        const {pathname} = useLocation();
        const selected = (selectedPaths || [to]).some((path) =>
            matchPath(pathname, {path: path, exact: true})
        );
        return (
            <ListItem button to={to} component={Link} selected={selected}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title}/>
            </ListItem>
        );
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Header open={open} handleDrawerOpen={handleDrawerOpen} useStyles={useStyles} pageTitle={pageTitle}
                    showSubheader={showSubheader}/>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {routes.map((route, i) =>
                        route.visible ?
                            <MenuItem
                                to={route.path}
                                icon={route.icon}
                                title={route.title}
                                key={route.title}
                            />
                            : null
                    )}
                </List>
                <Divider/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {children}
            </main>
        </div>
    );
}
