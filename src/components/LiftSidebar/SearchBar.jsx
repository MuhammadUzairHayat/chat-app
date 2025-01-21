import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SearchBar = ({ setFilterUser, usersData }) => {
  const { authUser } = useContext(AuthContext);
  const [searchingUser, setSearchingUser] = useState('');

  useEffect(() => {
    let timerId = setTimeout(() => {
      if (searchingUser === '') {
        // If search text is empty, show all users except the authenticated user
        const allUsersExceptAuth = usersData.filter(user => user.id !== authUser.uid);
        setFilterUser(allUsersExceptAuth);
      } else {
        // Filter users based on the search text
        const foundUsers = usersData.filter(user => 
          user.id !== authUser.uid && 
          user.username.toLowerCase().includes(searchingUser)
        );
        setFilterUser(foundUsers);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchingUser, authUser, usersData, setFilterUser]);

  return (
    <input
      type="text"
      onChange={({ target }) => setSearchingUser(target.value.toLowerCase())}
      placeholder="Search..."
    />
  );
};

export default SearchBar;
