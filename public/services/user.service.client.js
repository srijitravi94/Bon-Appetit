(function () {
   angular
       .module('BonAppetit')
       .factory('userService', userService);

   function userService($http) {

       var api = {
           "createUser"            : createUser,
           "findUserByUsername"    : findUserByUsername,
           "findUserByCredentials" : findUserByCredentials,
           "findUserById"          : findUserById,
           "updateUser"            : updateUser,
           "deleteUser"            : deleteUser,
           "login"                 : login,
           "loggedin"              : loggedin,
           "register"              : register,
           "logout"                : logout,
           "likeRestaurant"        : likeRestaurant,
           "unLikeRestaurant"      : unLikeRestaurant,
           "isRestaurantLiked"     : isRestaurantLiked,
           "visited"               : visited,
           "undoVisited"           : undoVisited,
           "haveBeenThere"         : haveBeenThere,
           "followUsers"           : followUsers,
           "unfollowUsers"         : unfollowUsers,
           "isUserFollowed"        : isUserFollowed,
           "checkAdmin"            : checkAdmin,
           "adminFindAllUsers"     : adminFindAllUsers,
           "adminDeleteUser"       : adminDeleteUser,
           "adminCreateUser"       : adminCreateUser,
           "adminUpdateUser"       : adminUpdateUser
       };

       return api;

       function createUser(newUser) {
           var url = "/api/project/user";
           return $http.post(url, newUser)
               .then(function (response) {
                   return response.data;
               })
       }

       function findUserByUsername(username) {
           var url = "/api/project/user?username=" +username;
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function findUserByCredentials(username, password) {
           var url = "/api/project/user?username=" +username+ "&password=" +password;
           return $http.get(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function findUserById(userId) {
           var url ="/api/project/user/" +userId;
           return $http.get(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function updateUser(user, userId) {
           var url = "/api/project/user/" +userId;
           return $http.put(url, user)
               .then(function (response) {
                  return response.data;
               });
       }

       function deleteUser(userId) {
           var url = "/api/project/user/" +userId;
           return $http.delete(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function login(username, password) {
           var url = "/api/project/login";
           var credentials = {
               username : username,
               password : password
           };
           return $http.post(url, credentials)
               .then(function (response) {
                   return response.data;
               });
       }
       
       function loggedin() {
           var url = "/api/project/loggedin";
           return $http.get(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function register(newUser) {
           var url = "/api/project/register";
           return $http.post(url, newUser)
               .then(function (response) {
                   console.log(response.data);
                   return response.data;
               });
       }

       function logout() {
           var url = "/api/project/logout";
           return $http.post(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function likeRestaurant(resId, userId) {
           var url = "/api/project/user/" +userId+ "/restaurant/like/" +resId;
           return $http.put(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function unLikeRestaurant(resId, userId) {
           var url = "/api/project/user/" +userId+ "/restaurant/unlike/" +resId;
           return $http.put(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function isRestaurantLiked(resId, userId) {
           var url = "/api/project/user/" +userId+ "/restaurant/like/" +resId;
           return $http.get(url)
               .then(function (response) {
                  return response.data;
               });
       }

       function visited(resId, userId) {
           var url = "/api/project/user/" +userId+ "/restaurant/visited/" +resId;
           return $http.put(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function undoVisited(resId, userId) {
           var url = "/api/project/user/" +userId+ "/restaurant/undoVisited/" +resId;
           return $http.put(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function haveBeenThere(resId, userId) {
           var url = "/api/project/user/" +userId+ "/restaurant/visited/" +resId;
           return $http.get(url)
               .then(function (response) {
                    return response.data;
               });
       }

       function followUsers(currentUserId, followUserId) {
           var url = "/api/project/user/" +currentUserId+ "/follow/" +followUserId;

           return $http.put(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function unfollowUsers(currentUserId, unfollowUserId) {
           var url = "/api/project/user/" +currentUserId+ "/unfollow/" +unfollowUserId;

           return $http.put(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function isUserFollowed(currentUserId, followUserId) {
           var url = "/api/project/user/" +currentUserId+ "/follow/" +followUserId;
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function checkAdmin() {
           var url = "/api/project/checkAdmin";
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function adminFindAllUsers() {
           var url = "/api/project/checkAdmin/user";
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function adminDeleteUser(userId) {
           var url = "/api/project/checkAdmin/" +userId;
           return $http.delete(url)
               .then(function (response) {
                   return response.data;
               });
       }

       function adminCreateUser(newUser) {
           var url = "/api/project/checkAdmin";
           return $http.post(url, newUser)
               .then(function (response) {
                   return response.data;
               });
       }

       function adminUpdateUser(user, userId) {
           var url = "/api/project/checkAdmin/" +userId;
           return $http.put(url, user)
               .then(function (response) {
                   return response.data;
               });
       }
   }
})();