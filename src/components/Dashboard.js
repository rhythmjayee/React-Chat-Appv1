import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import {context} from "../store/Store"

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(250),
        height: "auto",
      },
      textAlign:"center",
      padding:"50px"
    },
    flex:{
        display:"flex",
        alignItems:"center"
    },
    topicWindow:{
        width:"30%",
        height:"100%",
        borderRight:"1px solid grey"
    },
    chatWindow:{
        width:"70%",
        height:"100%",
        padding:"30px"
    },
    chatBox:{
        width:"85%",
        // height:"300px"
    },
    button:{
        width:"15%",
        // height:"300px"
    },
  }));

export default function Dashboard  ()  {
    const classes = useStyles();

    const {allChats,sendChatAction,user}=React.useContext(context);

    const topics=Object.keys(allChats);

    const [activeTopic,changeTopic]=useState(topics[0])
    const [textValue,changeTextValue]= useState("");

    const onChangeHandler = (event) => {
        changeTextValue( event.target.value);
      }

    return (
        <div className={classes.root}>
        <Paper elevation={3}>
            <Typography variant="h4">
                Chat App
            </Typography>
            <Typography variant="h4">
               { activeTopic }
            </Typography>
            <div className={classes.flex}>
                <div className={classes.topicWindow}>
                <List component="nav" aria-label="main mailbox folders">
                    {topics.map((topic,i)=>{
                        return <ListItem key={i} onClick={(e)=>changeTopic(e.target.innerText)} button>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText>
                            {topic}
                        </ListItemText>
                        </ListItem>
                    }
                    )}
                </List>
                        
                </div>
                <div className={classes.chatWindow}>
                    {allChats[activeTopic].map((chat,i)=>{
                        return <div key={i} className={classes.flex}>
                                <Chip label={chat.from} />
                                <Typography variant="body1">
                                    {chat.msg}
                                </Typography>
                        </div>
                        
                    }
                    )}
                
                </div>
                {/* <div className={classes.chatBox}>

                </div> */}
            </div>
            <div className={classes.flex}>
             <TextField  
             label="Send a chat"
             value={textValue}
             onChange={onChangeHandler}
              />
            <Button
             variant="contained"
              color="primary"
                  onClick={()=>{
                      sendChatAction({from:user,msg:textValue,topic:activeTopic});
                      changeTextValue('');
                  }}
                  >
                send
            </Button>
            </div>
        </Paper>
      </div>
    )
}
