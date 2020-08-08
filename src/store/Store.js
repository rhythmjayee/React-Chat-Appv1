import React from 'react'
import io from "socket.io-client"

export const context=React.createContext();


const initialState={
    general:[
        {from:"rhythm", msg:"yooo"},
        {from:"rhythm", msg:"yooo"},
        {from:"rhythm", msg:"yooo"},
    ],
    topic2:[
        {from:"rhythm", msg:"yooo"},
        {from:"rhythm", msg:"yooo"},
        {from:"jayee", msg:"yooo"},
    ]
}

const reducer=(state,action)=>{
    const {from,msg,topic}=action.payload
    switch(action.Type){
        case "RECEIVE_MESSAGE":
            console.log(from,msg,topic)
            return {
                ...state,
                [topic]: [
                  ...state[topic],
                  {
                    from,
                    msg,
                  },
                ],
              };
        
            default: {
              return state;
            }
          }
        }




let socket;

const user=`user${Math.floor(Math.random() * 100)}`;

const sendChatAction=(value)=>{
    socket.emit("chat-msg",value);
}
export default function Store(props){

    const [allChats,dispatch]= React.useReducer(reducer, initialState)
     
    if(!socket){
        socket=io(':3001');
        socket.on("chat-msg",  (data)=> {
            console.log(data);
            dispatch({ Type: "RECEIVE_MESSAGE", payload: data });
          });
    }

    // const user=`user${Math.floor(Math.random() * 100)}`;

    return (
        <context.Provider value={{allChats,sendChatAction,user}}>
            {props.children}
        </context.Provider>
    )
}
