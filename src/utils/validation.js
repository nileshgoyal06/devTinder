const validator = require("validator");

const validateuserData = (data) => {
  const { firstName, lastName, emailid, password } = data;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  }
  if (!validator.isEmail(emailid)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = validateuserData;
