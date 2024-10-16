// export authenticateUser function
export const  authenticateUser = (username, password) => {
    if( username === 'admin' && password === 'admin' ) return 'Valid User';
    return 'Invalid User'
}