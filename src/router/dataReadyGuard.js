import store from "../store/index";
import bus from "../modules/bus";

export default function (to, from, next) {
  console.log("data not ready");
  bus.on('dataReady', () => {
    console.log("in data ready guard");
    next();
  });
}