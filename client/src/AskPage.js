// import styled from 'styled-components';
// import Header1 from "./Header1";
// import BlueButton from "./BlueButton";
// import Input from './Input';
// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import {Redirect} from "react-router-dom";
// import ReactTags from 'react-tag-autocomplete';
// import PostBodyTextarea from "./PostBodyTextarea";

import styled from 'styled-components';
import Header1 from "./Header1";
import BlueButton from "./BlueButton";
import Input from './Input';
import ReactMarkdown from 'react-markdown';
import gfm from "remark-gfm";
import { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Container = styled.div`
  padding: 30px 20px;
`;

const QuestionBodyTextarea = styled.textarea`
background: none;
border: 1px solid #777;
border-radius: 3px;
display: block;
width: 100%;
box-sizing: border-box;
padding: 10px;
margin-bottom: 20px;
color: #fff;
`;

const PreviewArea = styled.div`
padding: 10px 20px;
background-color: #444;
border-radius: 5px;
margin-bottom: 20px;
`;

export default function AskPage() {

    const [questionTitle,setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [redirect, setRedirect] = useState('');

    function sendQuestion(ev) {
        ev.preventDefault();
        axios.post( 'http://localhost:3030/questions', {
            title: questionTitle,
            content: questionBody,        
        }, {withCredentials:true})
          .then(response => {
            console.log(response.data);
            setRedirect('/questions/'+response.data[0]);
          });
    }//OK

    return (
        <Container>
            {redirect && (
                <Redirect to={redirect} />
            )}
            <Header1 style={{marginBottom:'20px'}}>Ask a public question</Header1>            
            <form onSubmit={ev => sendQuestion(ev)}>
            <Input type="text"
                   value = {questionTitle}
                   onChange={e => setQuestionTitle(e.target.value)}
                   placeholder="Title of your question"/>            
            <QuestionBodyTextarea
                onChange={e => setQuestionBody(e.target.value)}
                placeholder="More info about your question. You can markdown here">{questionBody}</QuestionBodyTextarea>            
            <PreviewArea>
                <ReactMarkdown plugins={[gfm]} children={questionBody} />
            </PreviewArea>
            <BlueButton>Post question</BlueButton>
            </form>
        </Container>
    );

}



// export default function AskPage() {

//   const reactTags = React.createRef();

//   const [questionTitle,setQuestionTitle] = useState('');
//   const [questionBody, setQuestionBody] = useState('');
//   const [redirect, setRedirect] = useState('');
//   const [tags,setTags] = useState([]);
//   const [tagSuggestions,setTagSuggestions] = useState([]);

//   function sendQuestion(ev) {
//     ev.preventDefault();
//     axios.post('http://localhost:3030/questions', {
//       title: questionTitle,
//       content: questionBody,
//       tags: tags.map(tag => tag.id),
//     }, {withCredentials:true})
//       .then(response => {
//         console.log(response.data);
//         setRedirect('/questions/'+response.data[0]);
//       });
//   }

//   function getTags() {
//     axios.get('http://localhost:3030/tags')
//       .then(response => {
//         setTagSuggestions(response.data);
//       })
//   }

//   function onTagAddition(tag) {
//     const chosenTags = tags;
//     chosenTags.push(tag);
//     setTags(chosenTags);
//   }

//   function onTagDelete(indexToDelete) {
//     const newTags = [];
//     for (let i=0; i<tags.length; i++) {
//       if (i !== indexToDelete) {
//         newTags.push(tags[i]);
//       }
//     }
//     setTags(newTags);
//   }

//   useEffect(() => {
//     getTags();
//   }, []);

//   return (
//     <Container>
//       {redirect && (
//         <Redirect to={redirect} />
//       )}
//       <Header1 style={{marginBottom:'20px'}}>Ask a public question</Header1>
//       <form onSubmit={ev => sendQuestion(ev)}>
//         <Input type="text"
//                value={questionTitle}
//                onChange={e => setQuestionTitle(e.target.value)}
//                placeholder="Title of your question" />
//         <PostBodyTextarea
//           placeholder={"More info about your question. You can use markdown here"}
//           value={questionBody}
//           handlePostBodyChange={value => setQuestionBody(value)} />
//         <ReactTags
//           ref={reactTags}
//           tags={tags}
//           suggestions={tagSuggestions}
//           onDelete={ev => onTagDelete(ev)}
//           onAddition={ev => onTagAddition(ev)} />
//         <BlueButton type={'submit'}>Post question</BlueButton>
//       </form>
//     </Container>
//   );

// }
