import express from "express"
import { bookVisit, cancelBooking, createUser, getAllBookings, getAllFav, toFav } from "../controllers/userController.js"
// import jwtCheck from "../config/auth0Config.js"

const router = express.Router()

// router.post("/register", jwtCheck, createUser)
// router.post("/bookVisit/:id", jwtCheck, bookVisit)
// router.post("/removeBooking/:id", jwtCheck, cancelBooking )
// router.post("/toFav/:id", jwtCheck, toFav)
// router.post("/allFav", jwtCheck, getAllFav)

router.post("/register", createUser)
router.post("/bookVisit/:id", bookVisit)
router.post("/allBookings", getAllBookings)
router.post("/removeBooking/:id", cancelBooking)
router.post("/toFav/:rid", toFav)
router.post("/allFav", getAllFav)

export {router as userRoute}