import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import thinkingImg from '../../images/thinking.png';
import { Quotes } from '../../components';
import { getQuote } from '../../services';




export function App() {

  const isMounted = useRef(true);
  const [quoteState,setQuoteState] = useState(
    {quote:'Loading quote...',speaker:'Loading author...'}
    );

  const onUpdate = async()=>{
    const quoteQuery = await getQuote();
    if(isMounted.current){
    setQuoteState({quote:quoteQuery.content,speaker:quoteQuery.author})
    }
  }
  useEffect(()=>{
    onUpdate();
    return()=>{
      isMounted.current=false;
    }

  },[]);

  return (
    <>
    <TitleContainer>
    <h1>Random quotes using react</h1>
    <h3>Quotes from : quotable.io</h3>
    <hr/>
    </TitleContainer>
  

    <Content>

      <ThinkingImg src={thinkingImg} alt="Men thinking"></ThinkingImg>
<Quotes 
{...quoteState} 
onUpdate={onUpdate}
/>
    </Content>
    </>
  );
}


const Content = styled.div `
height:100vh;
padding: 0 30px;
display:flex;
`
const ThinkingImg = styled.img`
max-width:30vw;
align-self:flex-end;
`

const TitleContainer = styled.div `
text-align: center;
`