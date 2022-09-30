
const whitelist = [
  'http://localhost:3000'
];
var corsOptions = {
  credentials: true,
  origin: function (origin: string | undefined, callback: CallableFunction) {
    // console.log('og', origin);
    if ((whitelist.indexOf(origin ?? "") !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOptions;
