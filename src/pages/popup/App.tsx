import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import {
  Text,
  Button,
  Container,
} from '@nextui-org/react';
import { config } from '../../config';
import List from '../../components/List';

const rootElement = document.createElement('div');
rootElement.id = 'mobymask-root';

document.body.appendChild(rootElement);

function Root() {
  useEffect(() => { }, []);

  return (
    <Container
      css={{
        width: '360px',
        padding: '10px',
        fontFamily: 'Inter, sans-serif',
        ' *': {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Text
        id="modal-title"
        size={18}
        css={{
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '34px',
          textAlign: 'center',
          color: '#101828',
          marginTop: '30px',
          marginBottom: '20px',
        }}
      >
        Pending Reports
      </Text>
      <Container
        css={{
          maxHeight: '315px',
          overflow: 'auto',
          padding: '0',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundColor: '#aaa',
          },
        }}
      >
        <List />
      </Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          auto
          onPress={() => {
            window.open(config.dappUrl);
          }}
          css={{
            width: '253px',
            height: '48px',
            background: 'linear-gradient(90deg, #334FB8 0%, #1D81BE 100%)',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            borderRadius: '100px',
            color: '#fff',
            fontSize: '16px',
            '&:hover': {
              opacity: 0.7,
            },
          }}
        >
          Submit batch to blockchain
        </Button>

        <div
          style={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#666F85',
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          You can always find the entire list of pending reports on the official
          website: <a href="https://mobymask.com">mobymask.com</a>
        </div>
      </div>
    </Container>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Toaster />
  </React.StrictMode>,
  rootElement,
);
