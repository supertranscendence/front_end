import { IChannel, IUser } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, { useEffect, VFC } from 'react';
import { useParams } from 'react-router';
import { Redirect,NavLink, useLocation } from 'react-router-dom';
import useSWR from 'swr';

interface Props {
  channel: IChannel;
}
const EachChannel: VFC<Props> = ({ channel }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0;
  const { data: count, mutate } = useSWR<number>(
    // userData ? `api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/channel/${channel.name}`) {
      mutate(0);
    }
  }, [mutate, location.pathname, workspace, channel]);

    //console.log("test" , `/workspace/${workspace}/channel/${channel.name}`);
    return (
    <NavLink key={channel.name} activeClassName="selected" to={channel.name==="main"?`/workspace/${workspace}/intro`:`/workspace/${workspace}/channel/${channel.name}`}>
      <span className={count !== undefined && count > 0 ? 'bold' : undefined}>{channel.name}</span>
      {count !== undefined && count > 0 && <span className="count">{count}</span>}
    </NavLink>
  );
};

export default EachChannel;
