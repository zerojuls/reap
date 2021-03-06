var alt = require('../alt');
var UserWebAPIUtils = require('../utils/UserWebAPIUtils');

/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class UserActions {

  manuallogin(data) {
    this.dispatch();
    var _this = this;
    UserWebAPIUtils.manuallogin(data)
      .then(function(response, textStatus) {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          _this.actions.loginsuccess(data.email);
        }
      }, function() {
        // Dispatch another event for a bad login
      });
  }

  loginsuccess(email) {
    this.dispatch(email);
  }

  // Leaving this here for future use
  register(data) {
    this.dispatch(data);
  }

  logout() {
    this.dispatch();
    var _this = this;
    UserWebAPIUtils.logout()
      .then(function(response, textStatus) {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          _this.actions.logoutsuccess();
        }
      }, function() {
        // Dispatch another event for a bad login
      });
  }

  logoutsuccess() {
    this.dispatch();
  }
}

module.exports = alt.createActions(UserActions);
