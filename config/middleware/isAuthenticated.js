// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(request, response, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (request.user) {
    return next();
  }

  // If the user isnt' logged in, redirect them to the login page
  return response.redirect("/");
};
