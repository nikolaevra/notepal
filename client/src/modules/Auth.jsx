class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     * @param {string} userID
     */
    static authenticateUser(token, userID) {
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */
    static getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Get a userID value.
     *
     * @returns {string}
     */
    static getUserID() {
        return localStorage.getItem('userID');
    }

}

export default Auth;
