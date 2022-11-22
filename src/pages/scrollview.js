// simple react element
import { Card, CardContent, Container, IconButton, Modal, Pagination, TextField } from '@mui/material';
import React from 'react';
import ResponsiveAppBar from '../components/appbar';
import { TwitterCard } from '../components/card';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Stack } from '@mui/system';

function importAll(r) {
    return r.keys().map(r);
}

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
};

const sizes = [
    { cardWidth: "200px", borderRadius: "10px", cardMargin: "5px", imageMaxWidth: "175px", avatarSize: "20px", largeFontSize: "10px", mediumFontSize:"8px", smallFontSize: "6px" },
    { cardWidth: "300px", borderRadius: "12px", cardMargin: "8px", imageMaxWidth: "275px", avatarSize: "30px", largeFontSize: "16px", mediumFontSize:"12px", smallFontSize: "8px" },
    { cardWidth: "400px", borderRadius: "15px", cardMargin: "10px", imageMaxWidth: "375px", avatarSize: "40px", largeFontSize: "22px", mediumFontSize:"16px", smallFontSize: "10px" },
    { cardWidth: "500px", borderRadius: "18px", cardMargin: "15px", imageMaxWidth: "475px", avatarSize: "50px", largeFontSize: "28px", mediumFontSize:"20px", smallFontSize: "12px" },
    { cardWidth: "600px", borderRadius: "20px", cardMargin: "20px", imageMaxWidth: "575px", avatarSize: "60px", largeFontSize: "36px", mediumFontSize:"24px", smallFontSize: "15px" },
    { cardWidth: "700px", borderRadius: "22px", cardMargin: "25px", imageMaxWidth: "675px", avatarSize: "70px", largeFontSize: "42px", mediumFontSize:"28px", smallFontSize: "20px" },
    { cardWidth: "800px", borderRadius: "25px", cardMargin: "30px", imageMaxWidth: "775px", avatarSize: "80px", largeFontSize: "48px", mediumFontSize:"34px", smallFontSize: "26px" },
    { cardWidth: "900px", borderRadius: "28px", cardMargin: "35px", imageMaxWidth: "875px", avatarSize: "90px", largeFontSize: "54px", mediumFontSize:"42px", smallFontSize: "34px" },
    { cardWidth: "1000px", borderRadius: "30px", cardMargin: "40px", imageMaxWidth: "975px", avatarSize: "100px", largeFontSize: "62px", mediumFontSize:"54px", smallFontSize: "40px" },
]

export const ScrollView = () => {
    const samplejson = importAll(require.context('../data', false, /\.(json)$/));
    const [open, setOpen] = React.useState(false);
    const [modalContent, setModalContent] = React.useState("");
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [curSize, setCurSize] = React.useState(4);

    const currentSize = sizes[curSize];
    const [searchQuery, setSearchQuery] = React.useState("");
    const [sortDirection, setSortDirection] = React.useState(true);

    const [page, setPage] = React.useState(1);
    const pageSize = 25;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const filteredData = samplejson.filter((item)=>{
        return item.posted_by.toLowerCase().includes(searchQuery.toLowerCase()) || item.tweet_date.toLowerCase().includes(searchQuery.toLowerCase()) || item.posted_by_nickname.toLowerCase().includes(searchQuery.toLowerCase()) || item.tweet_content.toLowerCase().includes(searchQuery.toLowerCase());
    }).sort((a, b) => {
        if (!sortDirection){
            return (a.tweet_id - b.tweet_id);
        }else{
            return (b.tweet_id - a.tweet_id);
        }
    });

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const slicedData = filteredData.slice(startIndex, endIndex);

    return (
        <>
            <ResponsiveAppBar setCurSize={setCurSize} maxSize={sizes.length - 1}/>
            <Container sx={{width: currentSize["cardWidth"]}}>
                <Card sx={{ marginTop: currentSize["cardMargin"], borderRadius: currentSize["borderRadius"], width: currentSize["cardWidth"] }}>
                    <CardContent>
                        <TextField id="outlined-basic" label="Search" variant="outlined" sx={{width:"90%"}} onChange={(e)=>{setPage(1); setSearchQuery(e.target.value);}}/>
                        <IconButton size="large" color="inherit" onClick={()=>{setSortDirection((sortDirection)=>{return !sortDirection})}}>
                            {sortDirection ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        </IconButton>
                    </CardContent>
                </Card>
                {slicedData.map((item, i) => {
                    return (
                        <TwitterCard
                            key={i}
                            json={item}
                            modalOpen={handleOpen}
                            modalContent={setModalContent}
                            sizes={currentSize}
                            />
                    );
                })}
                <Stack alignItems="center" sx={{ marginTop: currentSize["cardMargin"], marginBottom: currentSize["cardMargin"] }}>
                    <Pagination count={totalPages} variant="outlined" onChange={(e, v)=>{scrollToTop(); setPage(v);}} size="large"/>
                </Stack>
            </Container> 
            <Modal
                open={open}
                onClose={handleClose}
            >
                <>
                {modalContent}
                </>
            </Modal>
        </>
    );
}