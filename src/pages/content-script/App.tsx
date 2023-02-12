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

const rootElement = document.createElement('div');
rootElement.id = 'mobymask-root';

document.body.appendChild(rootElement);

function Root() {
  const [waitList, setWaitList] = React.useState<string[]>([]);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  async function addUserId(userId: string) {
    await addToWaitList(userId);
    toast.success('Added to wait list');
    checkWaitList();
    setModalVisible(true);
  }
  async function removeUserId(userId: string) {
    await removeFromWaitList(userId);
    toast.success('Removed from wait list');
    checkWaitList();
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
  async function checkWaitList() {
    const _waitList = await getWaitingList();
    if (_waitList) {
      setWaitList(_waitList);
    }
  }
  useEffect(() => {
    checkReportDOM();
    checkWaitList();
    checkUserListPhisher();
  }, []);
  const columns = [
    {
      key: 'twitter userId',
      label: 'userId',
    },
    {
      key: 'action',
      label: 'action',
    },
  ];
  const rows = waitList.map((userId) => ({
    key: userId,
    userId,
  }));

  function closeHandler() {
    setModalVisible(false);
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={modalVisible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Pending Reports
        </Text>
      </Modal.Header>
      <Modal.Body>
        {rows.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '40px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#999',
            }}
          >
            No Records
          </div>
        ) : (
          <Table
            css={{
              maxHeight: '200px',
              minWidth: '100%',
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={rows}>
              {(item) => (
                <Table.Row key={item.key}>
                  <Table.Cell>@{item.userId}</Table.Cell>
                  <Table.Cell>
                    <Button
                      bordered
                      color="primary"
                      auto
                      size="xs"
                      onClick={() => {
                        console.log('remove', item.userId);
                        removeUserId(item.userId);
                      }}
                    >
                      Remove
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Cancel
        </Button>
        <Button
          auto
          onPress={() => {
            window.open(config.dappUrl);
          }}
        >
          Submit batch to blockchain
        </Button>
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
