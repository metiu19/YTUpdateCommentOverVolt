require('dotenv').config();
const { google } = require('googleapis');

var Views = 0;

const GetLike = () => {
    google.youtube('v3').comments.list({
        key: process.env.YTKey,
        part: 'id, snippet',
        id: 'Ugw_aX7Of9tw_xYy_pp4AaABAg'
    }).then(res => {
        console.log(res.data.items[0].snippet.likeCount);
        Views = parseInt(res.data.items[0].snippet.likeCount);
    }).catch(err => console.error(err));
}

GetLike();