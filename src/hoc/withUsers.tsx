import { useEffect, useState } from 'react';
import { useGetAllUsers, User } from '../http/hooks';

export interface EnrichProps {
  users: User[];
}

export function withUsers<T>(Component: React.ComponentType<T & EnrichProps>) {
  return function Wrapper(props: T) {
    const [users, setUsers] = useState<User[]>([]);

    const getAllUsersAPI = useGetAllUsers();
    useEffect(() => {
      getAllUsersAPI
        .request()
        .then(({ data }) => {
          if (data) setUsers(data);
        })
    }, []);

    return <Component {...props} users={users} />;
  };
}
