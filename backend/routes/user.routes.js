const router = require("express").Router();

const {
  userRegister,
  userLogin,
  userAuth,
  userPasswordChange,
  user,
  userFollowers,
  userCoverImageUpdate,
  userProfileEdit,
} = require("../controller/user.controller");
const upload = require("../utils/multer");

router.route("/register").post(upload.single("file"), userRegister);
router.route("/login").post(userLogin);
router.route("/authentication").get(userAuth);
router.route("/forgotpassword").patch(userPasswordChange);
router.route("/singleuser/:id").get(user);
router.route("/userfollowers").get(userFollowers);
router.route("/coverimageupdate").patch(upload.single('file'),userCoverImageUpdate);
router.route("/userprofileedit").patch(upload.single('file'),userProfileEdit);

module.exports = router;
