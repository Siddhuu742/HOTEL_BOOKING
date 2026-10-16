import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import transporter from "../configs/nodeMailer.js";
import User from "../models/User.js";

//Function to check Availability of Room
const checkAvailiability = async ({ checkInDate, checkOutDate, roomId }) => {
  try {
    const bookings = await Booking.find({
       
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
      roomId,
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
    res.json({ success: true, message: "BOOKING SUCCESSFULLY" });
  } catch (error) {
    console.error(error.message);
  }
};

//API to check Availability of room
// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate,roomId, guests } = req.body;
    const isAvailable = await checkAvailiability({
      checkInDate,
      checkOutDate,
       roomId,
       guests,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to create a new booking
//POST /api/bookings/book

export const createBooking = async (req, res) => {
  try {
    const {roomId, checkInDate, checkOutDate, guests } = req.body;
    
    const user = req.user._id;
   
    const roomData = await Room.findById(roomId).populate("hotel");
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }
    let totalPrice = roomData.pricePerNight;

    //Calculate totalPrice based on nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= nights;
    const booking = await Booking.create({
      user,
      room: roomId,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel Booking Details",
      html: `
                 <h2> Your Booking Details</h2>
                 <p>Dear ${req.user.username}</p>
                 <p>Thank you for your booking! Here are your details:</p>
                 <ul>
                     <li><strong>Booking ID:</strong> ${booking._id}</li>
                     <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                     <li><strong>Location:</strong> ${roomData.hotel.address}</li>
                     <li><strong>Date:</strong> ${booking.checkInDate.toDateString()}</li>
                     <li><strong>Booking Amount:</strong> ${process.env.CURRENCY || "$"} ${booking.totalPrice} / night</li>
                 </ul>
                 <p> We look forward to welcoming you!</p>
                 <p> If you need to make any changes, feel free to contact us.</p> 
            `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//API to get all bookings for a user
//GET / api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;
    console.log("GET USER BOOKINGS CALLED:", user);
    const bookings = await Booking.find({ user: user})
    .populate("hotel")
      .populate("room")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    res.json({ success: false, message: " Failed to fetch bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth().userId });
    if (!hotel) {
      return res.json({ success: false, message: "No Hotel found" });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate(" hotel ")
      .sort({ createdAt: -1 });

    //Total Bookings
    const totalBookings = bookings.length;

    //Total Revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice, 0 );

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings }
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to Fetch bookings" });
  }
};
