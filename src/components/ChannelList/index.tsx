import { CollapseButton } from 'src/components/DMList/styles';
import EachChannel from 'src/components/EachChannel';
import GameRoom from 'src/pages/GameRoom';
import { IChannel, IUser } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  channelData?: IChannel[];
  userData?: IUser;
}

const ChannelList: FC<Props> = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);
  //const { data: userData } = useSWR<IUser>('api/users', fetcher, {
  //  dedupingInterval: 2000, // 2초
  //});

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const chat:IChannel  = {name:"Chat", WorkspaceId:-1, id:-1, private:false};
  const game:IChannel  = {name:"Game", WorkspaceId:-1, id:-1, private:false};
  const gameroom:IChannel  = {name:"GameRoom", WorkspaceId:-1, id:-1, private:false};
  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Channels</span>
      </h2>
      <div>
          {!channelCollapse && (
          <>
            <Button variant='outlined' color='info' component={Link} to={`/workspace/sleact/intro`}>Main</Button>
            <EachChannel channel={chat}></EachChannel>
            <EachChannel channel={game}></EachChannel>
            <EachChannel channel={gameroom}></EachChannel>
          </>
          )}
      </div>
    </>
  );
};

export default ChannelList;
