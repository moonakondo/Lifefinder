const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { PORT, FRONTEND_URL } = require("./config");
const db = require("./db/index");
const path = require("path");

// Importing routes
const authRoutes = require("./routes/auth");
const testRoute = require("./routes/test");
const appointmentRoute = require("./routes/appointment");
const reviewRouter = require("./routes/review");
const upload = require("./routes/upload");
const BookingRouter = require("./routes/booking");
const ContactRouter = require("./routes/contact");
const IMessaging = require("./model/messaging");
const Payment = require("./model/payment");
const PaymentLink = require("./model/paymentLink");
const Subscription = require("./model/subscription");
const hospitalAuthRoutes = require("./routes/hsopitals/route");
const messagesRouter = require("./routes/message");
const paymentRouter = require("./routes/payment");
const meetingRoutes = require("./routes/meetings");
const scrapRoutes = require("./routes/clinics");
const SubscriptionLink = require("./model/subscriptionLink");
const {
  readTempFile,
  overwriteTempFile,
  updateTempFile,
  readTempFileInitial,
} = require("./modules/tempFile");

const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");

// Create HTTP server instance
const server = http.createServer(app);

// Middleware setup
app.use(cors({
  origin: FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// stripe logic
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

let tempPaymentData;
(async () => {
  tempPaymentData = await readTempFileInitial();
  // console.log("tempPaymentData: ", tempPaymentData, tempPaymentData?.length);
})();
// console.log("tempPaymentData outside: ", tempPaymentData);

setInterval(() => {
  tempPaymentData = tempPaymentData.filter((item) => {
    return Date.now() - item.time <= 24 * 60 * 60 * 1000; // 24 hours
  });
  overwriteTempFile(tempPaymentData);
}, 24 * 60 * 60 * 1000);
app.use(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log("Error in Webhook: ", err.message);
      return;
    }
    console.log("event.type: ", event.type);

    if (event.type == "charge.succeeded" && !event.data.object.invoice) {
      const session = event.data.object;
      console.log("Charge was successful!", session);

      const email = session.billing_details.email || session.customer_email; //this
      // const date = session.created;
      const date = new Date(session.created * 1000);
      const amount = Math.floor(session.amount / 100); //this
      const payment_intent = session.payment_intent; //this
      const payment_method = session.payment_method;

      const checkoutIntent = tempPaymentData.find((i) => {
        if (
          email &&
          payment_intent &&
          email == i.email &&
          payment_intent == i.payment_intent
        ) {
          return i;
        }
      });

      if (checkoutIntent) {
        tempPaymentData = tempPaymentData.map((i) => {
          if (
            email &&
            payment_intent &&
            email == i.email &&
            payment_intent == i.payment_intent
          ) {
            i = {
              ...i,
              email,
              date,
              amount,
              payment_intent,
              payment_method,
              time: Date.now(),
            };
          }
          return i;
        });

        const completeIntent = tempPaymentData.find((i) => {
          if (
            email &&
            payment_intent &&
            email == i.email &&
            payment_intent == i.payment_intent
          ) {
            return i;
          }
        });
        console.log("completeIntent inside charge.succeeded: ", completeIntent);

        let id;
        const paymentLink = await PaymentLink.findOne({
          paymentLink: completeIntent.metadata.payment_link,
        });
        if (paymentLink) {
          id = paymentLink._id;
        }

        const payment = new Payment({
          paymentLink: id,
          email: completeIntent.metadata.user_email,
          stripeEmail: completeIntent.email,
          paymentId: payment_intent || completeIntent.payment_intent,
          paymentLinkId: completeIntent.payment_link,
          paymentMethodId: payment_method || completeIntent.payment_method,
          amount: amount || completeIntent.amount,
          paymentSuccessTime: date || completeIntent.date,
          date: new Date(),
          paymentCompleted: true,
          hospital: completeIntent.metadata.hospital_id,
          service: {
            serviceName: completeIntent.metadata.service_name,
            serviceDate: completeIntent.metadata.selected_date,
            serviceDescription: completeIntent.metadata.selected_description,
            serviceTiming: completeIntent.metadata.selected_time,
          },
        });

        await payment.save();
        tempPaymentData = tempPaymentData.filter((i) => {
          if (email != i.email && payment_intent != i.payment_intent) {
            return i;
          }
        });
        // overwriteTempFile(tempPaymentData);
      } else {
        // const data = { email, date, amount, payment_intent, payment_method, time: Date.now() };
        // tempPaymentData.push(data);
        // updateTempFile(data);

        const data = {
          email,
          date,
          amount,
          payment_intent,
          payment_method,
          time: Date.now(),
        };
        tempPaymentData.push(data);
        updateTempFile(data);
      }
    }

    if (
      event.type == "checkout.session.completed" &&
      !event.data.object.subscription
    ) {
      const session = event.data.object;
      console.log("Checkout Session was successful!", session);

      const metadata = session.metadata;
      const email = session.customer_details.email || session.customer_email; //this
      const payment_link = session.id;
      const payment_intent = session.payment_intent; //this
      const amount = Math.floor(session.amount_total / 100); //this
      const date = new Date(session.created * 1000);

      const chargeIntent = tempPaymentData.find((i) => {
        if (
          email &&
          payment_intent &&
          email == i.email &&
          payment_intent == i.payment_intent
        ) {
          return i;
        }
      });

      if (chargeIntent) {
        tempPaymentData = tempPaymentData.map((i) => {
          if (
            email &&
            payment_intent &&
            email == i.email &&
            payment_intent == i.payment_intent
          ) {
            i = {
              ...i,
              email,
              date,
              amount,
              payment_intent,
              payment_link,
              metadata,
              time: Date.now(),
            };
          }
          return i;
        });

        const completeIntent = tempPaymentData.find((i) => {
          if (
            email &&
            payment_intent &&
            email == i.email &&
            payment_intent == i.payment_intent
          ) {
            return i;
          }
        });
        console.log(
          "completeIntent inside checkout.session.completed: ",
          completeIntent
        );

        let id;
        const paymentLink = await PaymentLink.findOne({
          paymentLink: completeIntent.metadata.payment_link,
        });
        if (paymentLink) {
          id = paymentLink._id;
        }

        const payment = new Payment({
          paymentLink: id,
          email: completeIntent.metadata.user_email,
          stripeEmail: completeIntent.email,
          paymentId: payment_intent || completeIntent.payment_intent,
          paymentLinkId: payment_link || completeIntent.payment_link,
          paymentMethodId: completeIntent.payment_method,
          amount: amount || completeIntent.amount,
          paymentSuccessTime: date || completeIntent.date,
          date: new Date(),
          paymentCompleted: true,
          hospital: completeIntent.metadata.hospital_id,
          service: {
            serviceName: completeIntent.metadata.service_name,
            serviceDate: completeIntent.metadata.selected_date,
            serviceDescription: completeIntent.metadata.selected_description,
            serviceTiming: completeIntent.metadata.selected_time,
          },
        });

        await payment.save();
        tempPaymentData = tempPaymentData.filter((i) => {
          if (email != i.email && payment_intent != i.payment_intent) {
            return i;
          }
        });
        // overwriteTempFile(tempPaymentData);
      } else {
        const data = {
          email,
          date,
          amount,
          payment_intent,
          payment_link,
          metadata,
          time: Date.now(),
        };
        tempPaymentData.push(data);
        updateTempFile(data);
      }
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    // FOR SUBSCRIPTION ONLY - STARTS HERE ***

    // if(event.type == 'customer.subscription.created') {
    //   const session = event.data.object;
    //   console.log('customer.subscription.created inside subscription: ', session);
    // }
    // if(event.type == 'checkout.session.completed' && event.data.object.subscription) {
    //   const session = event.data.object;
    //   console.log('checkout.session.completed inside subscription: ', session);
    // }
    // if(event.type == 'payment_intent.succeeded' && event.data.object.invoice) {
    //   const session = event.data.object;
    //   console.log('payment_intent.succeeded inside subscription: ', session);
    // }

    if (event.type == "customer.subscription.created") {
      const session = event.data.object;
      console.log(
        "customer.subscription.created inside subscription: ",
        session
      );
      const customerId = session.customer;
      const subscriptionId = session.id;
      const subscriptionEnd = session.current_period_end;
      const requestId = event.request.id;
      const requestKey = event.request.idempotency_key;
      const data = {
        customerId,
        subscriptionEnd,
        subscriptionId,
        requestId,
        requestKey,
        mode: "subscription",
        time: Date.now(),
      };
      tempPaymentData.push(data);
      updateTempFile(data); //comment
    }
    if (event.type == "payment_intent.succeeded" && event.data.object.invoice) {
      const session = event.data.object;
      console.log("payment_intent.succeeded inside subscription: ", session);
      const paymentId = session.id;
      const customerId = session.customer;
      const paymentMethodId = session.payment_method;
      const invoiceId = session.invoice;
      const stripeAmount = Math.floor(session.amount_received / 100);
      const requestId = event.request.id;
      const requestKey = event.request.idempotency_key;
      let subscription = tempPaymentData.find((i) => {
        if (requestId == i.requestId && requestKey == i.requestKey) {
          return i;
        }
      });
      // tempPaymentData = tempPaymentData.filter(i => {
      //   const time = Date.now();
      //   const differenceInMinutes = Math.abs(i.time - time) / (1000 * 60);
      //   if(requestId != i.requestId && requestKey != i.requestKey && differenceInMinutes <= 10) {
      //     return i;
      //   }
      // });

      // new
      const paymentIntent = tempPaymentData.find((i) => {
        if (
          customerId == i.customerId &&
          invoiceId == i.invoiceId &&
          stripeAmount == i.stripeAmount
        ) {
          return i;
        }
      });
      if(!paymentIntent) {
        const data = {
          paymentId: paymentId,
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId,
          stripeAmount: stripeAmount,
          subscription: subscription,
          subscriptionId: subscription?.subscriptionId,// new - tbr
          time: Date.now(),
        };
        tempPaymentData.push(data);
        updateTempFile(data);
      }

      if(paymentIntent) { // here is the new
        let subscription = tempPaymentData.find((i) => {
          if (customerId == i.customerId && paymentIntent.subscriptionId == i.subscriptionId && i.mode == "subscription") {
            return i;
          }
        });

        let stripeSubExpiry;
        if (subscription?.subscriptionEnd) {
          stripeSubExpiry = new Date(
            subscription.subscriptionEnd * 1000
          );
        } else {
          stripeSubExpiry = tempPaymentData.find((i) => {
            if (
              i.mode == "subscription" &&
              i.customerId == customerId &&
              i.paymentId == paymentId
            ) {
              return i;
            }
          })?.subscription?.subscriptionEnd;
          if (!stripeSubExpiry) {
            const subscription = await stripe.subscriptions.retrieve(
              paymentIntent.subscriptionId,
              {
                apiKey: `${process.env.STRIPE_KEY}`
              }
            );
            stripeSubExpiry = new Date(subscription.current_period_end * 1000);
          }
        }
        let id;
        const subscriptionLink = await SubscriptionLink.findOne({
          paymentLink: paymentIntent.paymentLinkIdDb,
        });
        if (subscriptionLink) {
          id = subscriptionLink._id;
        }

        const subscriptionInstace = new Subscription({
          paymentLink: id,
          email: paymentIntent.email,
          stripeEmail: paymentIntent.stripeEmail,
          paymentId: paymentId,
          paymentLinkId: paymentIntent.paymentLink,
          subscriptionId: paymentIntent.subscriptionId,
          paymentMethodId: paymentMethodId,
          customerId: customerId,
          invoiceId: invoiceId,
          amount: stripeAmount,
          paymentInitiatedTime: paymentIntent.paymentInitiatedTime,
          paymentSuccessTime: paymentIntent.paymentSuccessTime,
          date: new Date(),
          paymentCompleted: true,
          subscriptionType: paymentIntent.subscriptionType,
          subscriptionExpiry: stripeSubExpiry,
          hospital: paymentIntent.hospital
        });
        await subscriptionInstace.save();

        tempPaymentData = tempPaymentData.filter((i) => { // new - tbr
          if (
            customerId != i.customerId &&
            paymentIntent.subscriptionId != i.subscriptionId
          ) {
            return i;
          }
        });
      }
      // new - end

      // const data = {
      //   paymentId: paymentId,
      //   customerId: customerId,
      //   paymentMethodId: paymentMethodId,
      //   invoiceId: invoiceId,
      //   stripeAmount: stripeAmount,
      //   subscription: subscription,
      //   time: Date.now(),
      // };
      // tempPaymentData.push(data);
      // updateTempFile(data);
    }

    if (
      event.type == "checkout.session.completed" &&
      event.data.object.subscription
    ) {
      const session = event.data.object;
      console.log("checkout.session.completed inside subscription: ", session);
      const userId = session.metadata.userId;
      const type = session.metadata.type;
      const paymentLinkIdDb = session.metadata.paymentLinkIdDb;
      const paymentInitiatedTime = new Date(
        session.metadata.paymentInitiatedTime * 1000
      );
      const hospitalId = session.metadata.hospitalId;
      const email = session.customer_email || session.customer_details.email;
      const subscriptionId = session.subscription;
      const paymentLink = session.payment_link || session.id;
      const customerId = session.customer;
      const stripePaymentTime = new Date(session.created * 1000);
      const invoiceId = session.invoice;
      const stripeAmount = Math.floor(session.amount_total / 100);

      const paymentIntent = tempPaymentData.find((i) => {
        if (
          customerId == i.customerId &&
          invoiceId == i.invoiceId &&
          stripeAmount == i.stripeAmount
        ) {
          return i;
        }
      });
      tempPaymentData = tempPaymentData.filter((i) => {
        if (
          customerId != i.customerId &&
          invoiceId != i.invoiceId &&
          stripeAmount != i.stripeAmount
        ) {
          return i;
        }
      });

// new - start
      if(!paymentIntent) {
        const data = {
          // paymentId: paymentId,
          // paymentMethodId: paymentMethodId,
          customerId: customerId,
          invoiceId: invoiceId,
          stripeAmount: stripeAmount,
          subscriptionId: subscriptionId,
          paymentLink: paymentLink,
          paymentLinkIdDb: paymentLinkIdDb,
          
          email: userId,
          stripeEmail: email,
          amount: stripeAmount,
          paymentInitiatedTime: paymentInitiatedTime,
          paymentSuccessTime: stripePaymentTime,
          subscriptionType: type,
          hospital: hospitalId,

          time: Date.now(),
        };
        tempPaymentData.push(data);
        updateTempFile(data);
      }

      // console.log('payemntIntent inside checkout.session.completed: ', paymentIntent, paymentIntent?.subscription);
      if(paymentIntent) {
        let stripeSubExpiry;
        if (paymentIntent?.subscription?.subscriptionEnd) {
          stripeSubExpiry = new Date(
            paymentIntent.subscription.subscriptionEnd * 1000
          );
        } else {
          stripeSubExpiry = tempPaymentData.find((i) => {
            if (
              i.mode == "subscription" &&
              i.customerId == customerId &&
              i.subscriptionId == subscriptionId
            ) {
              return i;
            }
          })?.subscription?.subscriptionEnd;
          if (!stripeSubExpiry) {
            const subscription = await stripe.subscriptions.retrieve(
              subscriptionId,
              {
                apiKey: `${process.env.STRIPE_KEY}`
              }
            );
            stripeSubExpiry = new Date(subscription.current_period_end * 1000);
          }
        }
        let id;
        const subscriptionLink = await SubscriptionLink.findOne({
          paymentLink: paymentLinkIdDb,
        });
        if (subscriptionLink) {
          id = subscriptionLink._id;
        }

        const subscription = new Subscription({
          paymentLink: id,
          email: userId,
          stripeEmail: email,
          paymentId: paymentIntent.paymentId,
          paymentLinkId: paymentLink,
          paymentMethodId: paymentIntent.paymentMethodId,
          subscriptionId: subscriptionId,
          customerId: customerId,
          invoiceId: invoiceId,
          amount: stripeAmount,
          paymentInitiatedTime: paymentInitiatedTime,
          paymentSuccessTime: stripePaymentTime,
          date: new Date(),
          paymentCompleted: true,
          subscriptionType: type,
          subscriptionExpiry: stripeSubExpiry,
          hospital: hospitalId
        });
        await subscription.save();

        tempPaymentData = tempPaymentData.filter((i) => { // new - tbr
          if (
            customerId != i.customerId &&
            subscriptionId != i.subscriptionId
          ) {
            return i;
          }
        });
      }
// new - end


      // let stripeSubExpiry;
      // console.log('payemntIntent inside checkout.session.completed: ', paymentIntent, paymentIntent?.subscription);
      // if (paymentIntent?.subscription?.subscriptionEnd) {
      //   stripeSubExpiry = new Date(
      //     paymentIntent.subscription.subscriptionEnd * 1000
      //   );
      // } else {
      //   stripeSubExpiry = tempPaymentData.find((i) => {
      //     if (
      //       i.mode == "subscription" &&
      //       i.customerId == customerId &&
      //       i.subscriptionId == subscriptionId
      //     ) {
      //       return i;
      //     }
      //   })?.subscription?.subscriptionEnd;
      //   if (!stripeSubExpiry) {
      //     const subscription = await stripe.subscriptions.retrieve(
      //       subscriptionId,
      //       {
      //         apiKey: `${process.env.STRIPE_KEY}`
      //       }
      //     );
      //     stripeSubExpiry = new Date(subscription.current_period_end * 1000);
      //   }
      // }
      // let id;
      // const subscriptionLink = await SubscriptionLink.findOne({
      //   paymentLink: paymentLinkIdDb,
      // });
      // if (subscriptionLink) {
      //   id = subscriptionLink._id;
      // }

      // const subscription = new Subscription({
      //   paymentLink: id,
      //   email: userId,
      //   stripeEmail: email,
      //   paymentId: paymentIntent.paymentId,
      //   paymentLinkId: paymentLink,
      //   paymentMethodId: paymentIntent.paymentMethodId,
      //   subscriptionId: subscriptionId,
      //   customerId: customerId,
      //   invoiceId: invoiceId,
      //   amount: stripeAmount,
      //   paymentInitiatedTime: paymentInitiatedTime,
      //   paymentSuccessTime: stripePaymentTime,
      //   date: new Date(),
      //   paymentCompleted: true,
      //   subscriptionType: type,
      //   subscriptionExpiry: stripeSubExpiry,
      //   hospital: hospitalId
      // });
      // await subscription.save();
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }
    // subscription update functionality
    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      console.log(
        "customer.subscription.updated inside subscription: ",
        subscription
      );
      const customerId = subscription.customer;
      const subscriptionId = subscription.id;
      const subscriptionStart = subscription.current_period_start;
      const subscriptionEnd = subscription.current_period_end;
      const autoRenew = subscription.status === "active";

      if (autoRenew) {
        const stripeSubStart = new Date(subscriptionStart * 1000);
        const stripeSubExpiry = new Date(subscriptionEnd * 1000);
        const subscription = await Subscription.findOne({
          customerId: customerId,
          subscriptionId: subscriptionId,
        });

        if (subscription) {
          const renewalData = {
            renewalDate: new Date(),
            subscriptionStart: stripeSubStart,
            subscriptionEnd: stripeSubExpiry,
          };
          subscription.renewalHistory.push(renewalData);
          subscription.subscriptionExpiry = stripeSubExpiry;

          await subscription.save();
        }

        // const queryUpdate = `UPDATE payment_stripe SET renewalHistory = '${JSON.stringify(existingRenewalHistory)}', subscriptionExpiry = '${stripeSubExpiry}' WHERE customerId = '${customerId}' AND subscriptionId = '${subscriptionId}'`;
        // await queryAsync(queryUpdate);

        console.log(
          "Subscription renewal history and expiry updated for customer:",
          customerId
        );
      } else {
        console.log("Subscription is not set to auto-renew.");
      }
    }

    response.send();
  }
);

// Socket.io setup
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();
const socketToRoom = new Map();
const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: [FRONTEND_URL], // Allow requests from frontend running on localhost:3000
    methods: ["GET", "POST"], // Allowed HTTP methods
  },
});

// Socket.io event handling
io.on("connection", (socket) => {
  // console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", async (data) => {
    try {
      const { sender_id, recipient_id, message, image, uploadimage } = data;
      const newMessage = new IMessaging({
        sender_id,
        recipient_id,
        message,
        image,
        uploadimage,
      });
      await newMessage.save();
      io.emit("newMessage", newMessage); // Emit new message to all connected clients
    } catch (error) {
      console.error("Error handling chat message:", error);
    }
  });
  socket.on("room:join", (data) => {
    const { email, room } = data;
    const clientsInRoom = io.sockets.adapter.rooms.get(room);
    const numClients = clientsInRoom?.size || 0;
    const clientIds = clientsInRoom ? Array.from(clientsInRoom) : [];
    if(numClients > 1 && !clientIds.includes(socket.id)) {
      console.log('room full: ', clientIds, socket.id);
      io.to(socket.id).emit("room:join", {...data, socketId: socket.id, room: null});
      return;
    }

    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    socketToRoom.set(socket.id, room);
    io.to(socket.id).emit("room:join", { ...data, socketId: socket.id, users: clientIds });

    // extra
    console.log(`Socket IDs in room ${room}: ${clientIds}, this client: ${socket.id}`);
  });

  socket.on("room:check", ({ roomId }) => {
    const clientsInRoom = io.sockets.adapter.rooms.get(roomId);
    // const numClients = clientsInRoom?.size || 0;
    const clientIds = clientsInRoom ? Array.from(clientsInRoom) : [];
    console.log(`socket: ${socket.id} checked.`);
    if(!clientIds.includes(socket.id)) {
      console.log(`socket: ${socket.id} checked: didn't found.`);
      io.to(socket.id).emit("room:check", { status: true });
    }
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    // console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    // console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
  socket.on("call:ended", ({ to, roomId, status }) => {
    console.log('call:ended ', to);
    io.to(to).emit("call:ended", { from: socket.id, status });

    // under testing
    if(roomId) {
      console.log(`socket: ${socket.id} leaving room: ${roomId} b/c of socket: ${to}`);
      socket.leave(roomId);
    }
  });
  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);

    // Deleting socket from room, and letting other members know
    const room = socketToRoom.get(socket.id);
    io.to(room).emit("call:ended", { from: socket.id });
    socket.leave(room);
    socketToRoom.delete(socket.id);
  });
});


app.use(express.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Route middleware setup
app.use("/", scrapRoutes);
app.use("/", testRoute);
app.use("/", authRoutes);
app.use("/", appointmentRoute);
app.use("/", reviewRouter);
app.use("/", BookingRouter);
app.use("/", reviewRouter);
app.use("/", upload);
app.use("/", ContactRouter);
app.use("/", messagesRouter);
app.use("/", hospitalAuthRoutes);
app.use("/", paymentRouter);
app.use("/", scrapRoutes);
app.use("/", meetingRoutes);


server.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});