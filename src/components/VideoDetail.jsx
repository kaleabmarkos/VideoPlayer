import {useState, useEffect} from "react";
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Stack } from "@mui/material";
import ReactPlayer from "react-player";
import { CheckCircle } from "@mui/icons-material";
import { Videos} from './'
import { fetchFromAPI } from "../utils/fetchFromAPI";



const VideoDetail = () =>{
    const [VideoDetail, setVideoDetail] = useState(null)
    const [Videos, setVideos] = useState(null)
    const { id } = useParams();
   
    useEffect(() =>{
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail)
    },[id]);

    fetchFromAPI(`search?part=snippet&relatedToVidoeId=${id}&type=video`).then((data) => setVideos(data.items))

    if(!VideoDetail?.snippet) return 'Loading...';

    const { snippet: { title, channelId, channelTitle }, statistics:{viewCount, likeCount} } = VideoDetail;

    return(
        <Box minHeight="95vh">
            <Stack direction={{xs: 'colum', md:'row'}}>
                <Box flex={1}>
                    <Box sx={{ width:'100%', position:'sticky', top:'86px'}}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}
                        className="react-player" controls/>
                        <Typography color='#fff' varient="h5" fontWeight="bold" p={2}>
                            {title}
                        </Typography>
                        <Stack direction='row' justifyContent='space-between' sx={{color:"#fff"}} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography varient={{ sm: 'subtitle1', md: 'h6'}}
                                color="#fff">
                                    {channelTitle}
                                    <CheckCircle sx={{ fontSize: '12px', color:'gray', ml:'px'}}/>
                                </Typography>
                            </Link>
                            <Stack>
                            <Typography direction="row" gap="20px" alignItems="center">
                                    {parseInt(viewCount).toLocaleString()} likes
                                </Typography>
                                <Typography varient='body1' sx={{ opacity: 0.7}}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{md:1, xs:5}} justifyContent='center' alignItems='center'>
                <Videos video={Videos}/>
                </Box>
            </Stack>
            
        </Box>
    )
}

export default VideoDetail