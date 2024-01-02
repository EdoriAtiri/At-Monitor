function parseJwt(token) {
  // Extract the base64-encoded payload from the token
  var base64Url = token.split(".")[1];

  // Replace characters used in base64url encoding and decode the base64 string
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        // Convert each character to its Unicode code point and format it as hexadecimal
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  // Parse the decoded JSON payload into a JavaScript object
  return JSON.parse(jsonPayload);
}

function isTokenValid(token) {
  // Parse the JWT
  const decodedToken = parseJwt(token);

  // Check if the 'exp' claim is present in the decoded token
  if (!decodedToken.exp) {
    return false; // 'exp' claim is required
  }

  // Convert 'exp' to milliseconds and compare with the current date and time
  const expirationTimeInMilliseconds = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTimestamp = new Date().getTime();

  // Return true if the token is not expired, false otherwise
  return expirationTimeInMilliseconds > currentTimestamp;
}

export default isTokenValid;
