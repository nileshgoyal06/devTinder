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
const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailid",
    "photoUrl",
    "skills",
    "gender"
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};
module.exports = {
  validateuserData,
  validateEditProfileData,
};
 