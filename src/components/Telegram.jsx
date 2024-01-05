// import React, { useEffect, useState } from "react";
// import { Widget, addResponseMessage } from "react-chat-widget";
// import { w3cwebsocket as W3CWebSocket } from "websocket";
// // import {
// //   Grid,
// //   Image,
// //   Button,
// //   Container,
// //   Divider,
// //   Header,
// // } from 'semantic-ui-react';
// // import { Message } from 'semantic-ui-react';

// import PropTypes from 'prop-types';

// function Message({ children }) {
//   return (
//     <div
//       href="#"
//       className="block w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 text-center no-underline shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
//       {/* <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5> */}
//       <p className="text-sm font-normal text-gray-700 dark:text-gray-400">{children}</p>
//     </div>
//   );
// }

// Message.propTypes = {
//   children: PropTypes.node.isRequired,
// };
// const client = new W3CWebSocket("ws://127.0.0.1:4000");

// export default function Telegram() {
//   const [listMsg, updateListMsg] = useState(["Initialized"]);
//   const [calls, updateCalls] = useState([]);

//   const [, forceUpdate] = React.useState(0);

//   useEffect(() => {
//     client.onopen = () => {
//       console.log("WebSocket Client Connected");
//     };

//     client.onmessage = (message) => {
//       let lists = listMsg;
//       console.log(message.data);
//       let data = JSON.parse(message.data);

//       let finalMsg = data.msg;
//       finalMsg = finalMsg.substring(0, 100);
//       addResponseMessage(finalMsg);

//       console.log("🚀 ~ file: Telegram.js ~ line 20 ~ updateMsg2 ~ listMsg", listMsg);
//       lists.unshift(finalMsg);
//       lists.slice(0, 100);
//       updateListMsg(lists);
//       if ((data.type === "bnf" || data.type === "nifty") && data.option != "none") {
//         let c2 = calls;
//         data["time"] = new Date().toLocaleTimeString();
//         c2.unshift(data);
//         updateCalls(c2);
//       }
//       forceUpdate((n) => !n);
//     };
//   }, []);

//   const handleNewUserMessage = (newMessage) => {
//     // console.log(`New message incoming! ${newMessage}`);
//     client.send(newMessage);
//   };

//   function ListMsg(props) {
//     return (
//       <div>
//         {props.messages.map((msg, idx) => (
//           <Message key={idx}>{msg}</Message>
//         ))}
//       </div>
//     );
//   }

//   function ListCalls(props) {
//     return (
//       <div>
//         {props.messages.map((msg, idx) => (
//           <Message key={idx}>
//             {msg.type.toUpperCase()} - {msg.num} {msg.option == "none" ? "" : msg.option}{" "}
//             {msg.bos.toUpperCase()} - {msg.time}
//           </Message>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <>
//       <div class="container mx-auto" style={{ marginTop: "3em" }}>
//         <h1>Telegram</h1>

//         <div class="row">
//           <div class="row">
//             <div class="col-8">
//               <ListCalls messages={calls} />
//             </div>
//             <div class="col-4">
//               <ListMsg messages={listMsg} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Widget
//         handleNewUserMessage={handleNewUserMessage}
//         title="Telegram"
//         subtitle="Latest messages"
//       />
//     </>
//   );
// }
