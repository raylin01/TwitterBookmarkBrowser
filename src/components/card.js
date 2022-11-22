import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, IconButton, Link, SvgIcon } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ImageCarousel } from './imagecarousel';

const verified = (
    <SvgIcon>
        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" fill="#1da1f2"/>
    </SvgIcon>
);

export function TwitterCard(props) {
    const { json, modalOpen, modalContent, sizes } = props;
    const profile_name = <Typography sx={{ fontSize: sizes["mediumFontSize"] }}>{json.posted_by} {json.verified ? verified : ""}</Typography>;
    const profile_username = <Typography sx={{fontSize: sizes["smallFontSize"] }}>@{json.posted_by_nickname}</Typography>
    return (
        <Card sx={{ marginTop: sizes["cardMargin"], borderRadius: sizes["borderRadius"], width: sizes["cardWidth"] }}>
            <CardHeader
                avatar={
                <Avatar src={process.env.PUBLIC_URL + json.posted_by_profile_pic} sx={{ width: sizes["avatarSize"], height: sizes["avatarSize"], border: "1px solid grey" }}/>
                }
                action={
                <IconButton aria-label="settings" onClick={(e)=>{e.preventDefault();}}>
                    <MoreVertIcon />
                </IconButton>
                }
                title={profile_name}
                subheader={profile_username}
                component={Link}
                href={json.posted_by_profile_url}
                sx = {{ textDecoration: "none", color: "black", paddingBottom: "0px" }}
            />
            <CardContent>
                <Typography sx={{ fontSize: sizes["largeFontSize"] }} component="div">
                    {json.tweet_content}
                </Typography>
                {json.tweet_media && <ImageCarousel media={json.tweet_media} modalOpen={modalOpen} modalContent={modalContent} sizes={sizes}/>}
                <Typography sx={{ fontSize: sizes["smallFontSize"], marginTop: sizes["cardMargin"] }} color="text.secondary" gutterBottom>
                    {json.tweet_date} <Link href={json.tweet_url} target="_blank">Go to Tweet</Link>
                </Typography>
            </CardContent>
        </Card>
    );
}