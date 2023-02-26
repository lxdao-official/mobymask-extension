import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Button, Container, Link } from '@nextui-org/react';
import { getWaitingList, removeFromWaitList } from '../functions/storage';

function List() {
  const [waitList, setWaitList] = React.useState<string[]>([]);

  async function removeUserId(userId: string) {
    await removeFromWaitList(userId);
    toast.success('Removed from wait list');
    checkWaitList();
  }
  async function checkWaitList() {
    const _waitList = await getWaitingList();
    if (_waitList) {
      setWaitList(_waitList);
    }
  }
  useEffect(() => {
    checkWaitList();
  }, []);

  const rows = waitList.map((userId) => ({
    key: userId,
    userId,
  }));

  return (
    <>
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
        rows.map((item) => (
          <Container
            key={item.key}
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 8px !important',
              margin: '0px !important',
              boxSizing: 'border-box',
              borderRadius: '8px',
              '&:hover': {
                background: '#f3f3f3',
              },
            }}
          >
            <Link
              css={{
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '19px',
                color: '#101828',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              href={`https://twitter.com/${item.userId}`}
            >
              @{item.userId}
            </Link>
            <div>
              <Button
                bordered
                color="primary"
                auto
                size="xs"
                onClick={() => {
                  console.log('remove', item.userId);
                  removeUserId(item.userId);
                }}
                css={{
                  border: '1px solid #D0D5DD',
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  borderRadius: '100px',
                  width: '94px',
                  height: '48px',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#0D1320',
                  '&:hover': {
                    color: '#000',
                    background: '#fff',
                  },
                }}
              >
                Remove
              </Button>
            </div>
          </Container>
        ))
      )}
    </>
  );
}

export default List;
