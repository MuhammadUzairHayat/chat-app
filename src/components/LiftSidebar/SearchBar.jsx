import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../config/firebase';

const SearchBar = ({setFilterUser, usersData}) => {
  const {authUser, setAuthUser} = useContext(AuthContext)
  const [searchingUser, setSearchingUser] = useState(null)

 

  

  useEffect(()=> {
    let timerId = setTimeout(() => {
    let findUser = usersData.filter((user)=>  {
        if (searchingUser && user.email !== authUser.email) {
            return user.username.includes(searchingUser)
        }
    })
     console.log(`filterUser: `, findUser)
     setFilterUser(findUser)
        
    }, 500);

    return ()=> clearTimeout(timerId)
  }, [searchingUser, authUser, usersData])
 
  return (
    <input type="text" onChange={({target}) => setSearchingUser(target.value.toLocaleLowerCase())} placeholder="Search..." />

  )
}

export default SearchBar
