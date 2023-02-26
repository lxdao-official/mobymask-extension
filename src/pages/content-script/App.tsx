import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast, Toaster } from 'react-hot-toast';
import {
  NextUIProvider,
  createTheme as createThemeNextUI,
  Modal,
  Table,
  Text,
  Button,
  Link,
} from '@nextui-org/react';
import {
  checkMenuDom,
  checkUserIds,
  getMenuUserId,
  insertReportDOM,
} from '../../functions/dom';
import {
  addToWaitList,
  getWaitingList,
  removeFromWaitList,
} from '../../functions/storage';
import { config } from '../../config';
import List from '../../components/List';

const rootElement = document.createElement('div');
rootElement.id = 'mobymask-root';

document.body.appendChild(rootElement);

function Root() {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  async function addUserId(userId: string) {
    await addToWaitList(userId);
    toast.success('Added to wait list');
    setModalVisible(true);
  }

  function checkReportDOM() {
    const twitterReportDOM = checkMenuDom();

    if (twitterReportDOM) {
      const userId = getMenuUserId(twitterReportDOM);
      const dom = insertReportDOM(twitterReportDOM);

      dom?.addEventListener('click', () => {
        if (userId) {
          addUserId(userId);
        }
      });
    }
    setTimeout(() => {
      checkReportDOM();
    }, 1000);
  }

  function checkUserListPhisher() {
    checkUserIds();
    setTimeout(() => {
      checkUserListPhisher();
    }, 1000);
  }
  useEffect(() => {
    checkReportDOM();
    checkUserListPhisher();
  }, []);

  function closeHandler() {
    setModalVisible(false);
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={modalVisible}
      onClose={closeHandler}
      width="443px"
      css={{
        fontFamily: 'Inter, sans-serif',
        ' *': {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Modal.Header>
        <Text
          id="modal-title"
          css={{
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: '34px',
            textAlign: 'center',
            color: '#101828',
            marginTop: '30px !important',
            marginBottom: '20px !important',
          }}
        >
          Pending Reports
        </Text>
      </Modal.Header>
      <Modal.Body
        css={{
          maxHeight: '310px',
          overflow: 'auto',
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
      </Modal.Body>
      <Modal.Footer justify="center">
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
      </Modal.Footer>
    </Modal>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Toaster containerStyle={{ zIndex: 1000000000000 }} />
  </React.StrictMode>,
  rootElement,
);
