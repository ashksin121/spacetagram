import React, { useEffect, useState } from "react";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    Grid,
    Snackbar,
    Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EventIcon from "@mui/icons-material/Event";
import { red } from "@mui/material/colors";

import "./dashboard.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchData, toggleFavourite } from "./dashboardSlice";
import Comet from "../assets/comet.png";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [selectedDataIdx, setSelectedDataIdx] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const { isLoading, isError, data } = useAppSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const onToggleFavourite = (date: string) => {
        dispatch(toggleFavourite(date));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    };

    console.log(data);
    return (
        <div className="dashboardRoot">
            {isLoading ? (
                <div>
                    <div className="hlstd--spinner-container">
                        <div className="hlstd--spinner-inner"></div>
                        <div className="hlstd--spinner-outer"></div>
                        <div className="hlstd--spinner-logo">
                            <svg
                                width="50px"
                                viewBox="0 0 256 251"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                preserveAspectRatio="xMinYMin meet"
                            >
                                <g fill="#DF4F4F">
                                    <g>
                                        <path d="M0.438600784,0.438237494 L219.300393,232.265872 C219.300393,232.265872 226.756606,237.524722 232.458417,231.389397 C238.160226,225.254072 233.774219,219.118747 233.774219,219.118747 L0.438600784,0.438237494 L0.438600784,0.438237494 Z"></path>
                                        <path d="M69.7375247,22.3501121 L236.405823,202.027485 C236.405823,202.027485 243.862037,207.286334 249.563847,201.151009 C255.265657,195.015685 250.87965,188.88036 250.87965,188.88036 L69.7375247,22.3501121 L69.7375247,22.3501121 Z"></path>
                                        <path d="M21.0528376,69.2415241 L187.721136,248.918896 C187.721136,248.918896 195.17735,254.177746 200.87916,248.042422 C206.58097,241.907097 202.194962,235.771771 202.194962,235.771771 L21.0528376,69.2415241 L21.0528376,69.2415241 Z"></path>
                                        <path d="M128.320766,41.1943244 L244.761955,166.724176 C244.761955,166.724176 249.971166,170.398221 253.95468,166.111835 C257.938195,161.825451 254.873952,157.539065 254.873952,157.539065 L128.320766,41.1943244 L128.320766,41.1943244 Z"></path>
                                        <path d="M37.0918028,123.582973 L153.532991,249.112825 C153.532991,249.112825 158.742203,252.78687 162.725716,248.500484 C166.709231,244.214099 163.644989,239.927714 163.644989,239.927714 L37.0918028,123.582973 L37.0918028,123.582973 Z"></path>
                                        <path d="M188.159737,68.3650492 L240.934804,125.432206 C240.934804,125.432206 243.511631,127.153769 245.482147,125.145278 C247.452662,123.136787 245.936881,121.128295 245.936881,121.128295 L188.159737,68.3650492 L188.159737,68.3650492 Z"></path>
                                        <path d="M66.2287188,181.430322 L119.003786,238.497479 C119.003786,238.497479 121.580613,240.219043 123.551129,238.210552 C125.521643,236.20206 124.005863,234.193569 124.005863,234.193569 L66.2287188,181.430322 L66.2287188,181.430322 Z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            ) : isError ? (
                <div className="dashboardError">
                    <img
                        className="dashboardErrorImg"
                        src={Comet}
                        alt="Comet"
                    />
                    <p className="dashboardErrorText">
                        Something crashed along with our meteor!
                    </p>
                </div>
            ) : (
                <Grid container spacing={2} marginBottom={5} marginTop={5}>
                    {data.map((dataItem, idx) => (
                        <Grid item xs={12} md={4} lg={4} key={idx}>
                            <Card>
                                <CardActionArea
                                    onClick={() => {
                                        setOpen(true);
                                        setSelectedDataIdx(idx);
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={
                                            dataItem.media_type === "image"
                                                ? dataItem.url
                                                : dataItem.thumbnail_url!
                                        }
                                        alt={dataItem.media_type}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            component="div"
                                            style={{
                                                fontSize: "1.75rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {dataItem.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            style={{ fontSize: "1.4rem" }}
                                        >
                                            {dataItem.date}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions
                                    style={{
                                        height: "60px",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div
                                        onClick={() =>
                                            onToggleFavourite(dataItem.date)
                                        }
                                    >
                                        {dataItem.isFavourite ? (
                                            <FavoriteIcon
                                                fontSize="large"
                                                style={{ cursor: "pointer" }}
                                                sx={{ color: red[500] }}
                                            />
                                        ) : (
                                            <FavoriteBorderIcon
                                                fontSize="large"
                                                style={{ cursor: "pointer" }}
                                            />
                                        )}
                                    </div>
                                    <ShareIcon
                                        fontSize="large"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            const text =
                                                dataItem.media_type === "image"
                                                    ? dataItem.hdurl
                                                    : dataItem.url;
                                            navigator.clipboard
                                                .writeText(text)
                                                .then(() => {
                                                    setOpenSnackBar(true);
                                                });
                                        }}
                                    />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Dialog
                fullWidth={true}
                maxWidth="xl"
                open={open}
                onClose={handleClose}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={8}
                        lg={8}
                        className="modalImageContainer"
                    >
                        {data[selectedDataIdx!]?.media_type === "image" ? (
                            <img
                                src={data[selectedDataIdx!]?.hdurl}
                                alt={data[selectedDataIdx!]?.title}
                                className="modalImage"
                            />
                        ) : (
                            <div className="modalVideoContainer">
                                <iframe
                                    src={data[selectedDataIdx!]?.url}
                                    frameBorder="0"
                                    title="Embedded youtube"
                                    className="modalVideo"
                                />
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <div className="modalDescContainer">
                            <div>
                                <Typography
                                    variant="h2"
                                    component="div"
                                    gutterBottom
                                >
                                    {data[selectedDataIdx!]?.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    gutterBottom
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <EventIcon
                                        style={{
                                            marginRight: 10,
                                            fontSize: 20,
                                        }}
                                    />
                                    {data[selectedDataIdx!]?.date}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {data[selectedDataIdx!]?.explanation}
                                </Typography>
                            </div>
                            <div className="modalDescActionbar">
                                <div
                                    onClick={() =>
                                        onToggleFavourite(
                                            data[selectedDataIdx!].date
                                        )
                                    }
                                >
                                    {data[selectedDataIdx!]?.isFavourite ? (
                                        <FavoriteIcon
                                            fontSize="large"
                                            style={{
                                                cursor: "pointer",
                                                fontSize: 35,
                                            }}
                                            sx={{ color: red[500] }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            fontSize="large"
                                            style={{
                                                cursor: "pointer",
                                                fontSize: 35,
                                            }}
                                        />
                                    )}
                                </div>
                                <ShareIcon
                                    fontSize="large"
                                    style={{ cursor: "pointer", fontSize: 35 }}
                                    onClick={() => {
                                        const text =
                                            data[selectedDataIdx!]
                                                ?.media_type === "image"
                                                ? data[selectedDataIdx!]?.hdurl
                                                : data[selectedDataIdx!]?.url;
                                        navigator.clipboard
                                            .writeText(text)
                                            .then(() => {
                                                setOpenSnackBar(true);
                                            });
                                    }}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Dialog>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
                message="Sharable link copied to clipboard"
            />
        </div>
    );
};

export default Dashboard;
