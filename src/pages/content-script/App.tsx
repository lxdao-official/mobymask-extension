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
      console.log('twitterReportDOM', twitterReportDOM);
      const dom = insertReportDOM(twitterReportDOM);

      dom?.addEventListener('click', () => {
        console.log('userId', userId);
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
      // onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Pending Reports
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Table
          css={{
            height: '200px',
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
                  <Link
                    href="#"
                    onClick={() => {
                      removeUserId(item.userId);
                    }}
                  >
                    Remove
                  </Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Cancel
        </Button>
        <Button auto onPress={closeHandler}>
          Submit batch to blockchain
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Toaster />
  </React.StrictMode>,
  rootElement,
);
