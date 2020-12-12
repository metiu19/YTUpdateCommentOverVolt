require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2} = google.auth;
const OAuth2Client = new OAuth2(process.env.ClientID, process.env.ClientSecret);

OAuth2Client.setCredentials({
    refresh_token: process.env.refresh_token
})

const youtube = google.youtube({version: 'v3', auth: OAuth2Client});

var Views = 0;

const GetLike = () => {
  google.youtube('v3').comments.list({
      key: process.env.YTKey,
      part: 'id, snippet',
      id: 'Ugw_aX7Of9tw_xYy_pp4AaABAg'
  }).then(res => {
      console.log(res.data.items[0].snippet.likeCount);
      Views = parseInt(res.data.items[0].snippet.likeCount);
      UpdateComment();
  }).catch(err => console.error(err));
}

const UpdateComment = () => {
  const date = new Date();
  const Hours = date.getHours();
  const Minutes = date.getMinutes();
  youtube.comments.update({
      key: process.env.YTKey,
      part: 'id, snippet',
      requestBody:{
          "kind": "youtube#comment",
          "etag": "LdwUp1AbGwLq6kedivSq0VtBrD4",
          "id": "Ugw_aX7Of9tw_xYy_pp4AaABAg.9H84HPRKtP49H9y5pf2Q_6",
          "snippet": {
            "textDisplay": `Ora sono ${Views}\u003cbr /\u003e\u003cbr /\u003eUltimo aggiornamento: ${Hours}:${Minutes}\u003cbr /\u003e(Script in Node.js, sorgente rilasciato su github)`,
            "textOriginal": `Ora sono ${Views}\n\nUltimo aggiornamento: ${Hours}:${Minutes}\n(Script in Node.js, sorgente rilasciato su github)`,
            "parentId": "Ugw_aX7Of9tw_xYy_pp4AaABAg",
            "authorDisplayName": "metiu19",
            "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AAUvwnjFo1M4ppxLTGFuZFmB57cjLzrxAgQwENqLito_=s48-c-k-c0xffffffff-no-rj-mo",
            "authorChannelUrl": "http://www.youtube.com/channel/UCX0GdDJJMAIQA2XG0dNpUfA",
            "authorChannelId": {
              "value": "UCX0GdDJJMAIQA2XG0dNpUfA"
            },
            "canRate": true,
            "viewerRating": "none",
            "likeCount": 0,
            "publishedAt": "2020-12-12T10:38:38Z",
            "updatedAt": date
          }
        }
  })
  setInterval(() => GetLike(), 600000)
}

GetLike();