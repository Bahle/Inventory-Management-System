let UserProfile = (function() {
  let full_name = sessionStorage.getItem('CurrentUser');
  let privileges = sessionStorage.getItem('Privileges');

  let getName = function() {
    return full_name;
  };

  let setName = function(name) {
    full_name = name;
    sessionStorage.setItem('CurrentUser', full_name);
  };

  let getPrivileges = function() {
    return privileges;
  };

  let setPrivileges = function(privilege) {
    privileges = privilege;
    sessionStorage.setItem('Privileges', privileges);
  };

  let logOut = function() {
    full_name = null;
    sessionStorage.removeItem('CurrentUser');
    sessionStorage.removeItem('Privileges');
  };

  let isViewOnly = () => privileges == 'View';

  return {
    getName,
    setName,
    getPrivileges,
    setPrivileges,
    logOut,
    isViewOnly
  }

})();

export default UserProfile;