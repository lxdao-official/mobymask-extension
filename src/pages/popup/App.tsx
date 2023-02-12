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
    <div
      style={{
        width: '300px',
        height: '400px',
        padding: '20px',
      }}
    >
      <Text id="modal-title" size={18}>
        Pending Reports
      </Text>

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
      )}
      <Button
        auto
        onPress={() => {
          window.open(config.dappUrl);
        }}
        style={{
          marginTop: '20px',
        }}
      >
        Submit batch to blockchain
      </Button>
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Toaster />
  </React.StrictMode>,
  rootElement,
);
