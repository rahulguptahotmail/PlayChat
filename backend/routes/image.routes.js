const router = require("express").Router();
const {
  imageUpload,
  profileImage,
  profileImageDelete,
  imageLike,
  imageComment,
  homeImages,
  fetchSingleImage,
  singleUserProfile
} = require("../controller/image.controller");
const upload = require("../utils/multer");

router.route("/upload").post(upload.single("file"), imageUpload);
router.route("/delete/:imageId").delete(profileImageDelete);
router.route("/profile/:id").get(profileImage);
router.route("/imagelike").post(imageLike);
router.route("/imagecomment").post(imageComment);
router.route("/images").get(homeImages);
router.route("/fetchsingleimage").get(fetchSingleImage);
router.route("/singleuserprofile/:id").get(singleUserProfile);

module.exports = router;
