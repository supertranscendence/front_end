import EachDM from 'src/components/EachDM';
import useSocket from 'src/hooks/useSocket';
import { CollapseButton } from 'src/components/DMList/styles';
import { IDM, IUser, IUserWithOnline } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

const DMList = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  // const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
  //   dedupingInterval: 2000, // 2초
  // });
  // const { data: memberData } = useSWR<IUserWithOnline[]>(
  //   userData ? `/api/workspaces/${workspace}/members` : null,
  //   fetcher,
  // );
  const [socket] = useSocket(workspace);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [memberData, setmemberData] = useState([]);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    socket?.on('users', (data: []) => {
      setmemberData(()=>data);
    });
  }, [socket]);
  
  useEffect(() => {
    console.log('DMList: workspace 바꼈다', workspace);
    setOnlineList([]);
  }, [workspace]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    console.log('socket on dm', socket?.hasListeners('dm'), socket);
    return () => {
      console.log('socket off dm', socket?.hasListeners('dm'));
      socket?.off('onlineList');
    };
  }, [socket]);


  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          {/*<i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />*/}
          📎
        </CollapseButton>
        <span>My firends</span>
      </h2>
      <div>
        {!channelCollapse &&
          memberData?.map((member:{name:string,kg:number,email:string}) => {
            const isOnline = onlineList.includes(member.kg);
            return <EachDM key={member.kg} member={member} isOnline={isOnline} />;
          })
          }
      </div>
    </>
  );
};

export default DMList;