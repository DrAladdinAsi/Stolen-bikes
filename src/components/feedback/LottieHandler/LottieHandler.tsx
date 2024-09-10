import Lottie from "lottie-react";
import loadingLottie from "../../../assets/lottieFiles/loadingLottie.json"

import "./lottieHandler.css"

const lottieFilesMap = {
   loading : loadingLottie
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  const messageStyle = { fontSize: "19px", marginTop: "30px" };

      console.log("the error is ",message)

  return (
    <div className="lottieAndMessage_div">
      <Lottie animationData={lottie} style={{ width: "100px",height:"8rem",overflow:"hidden"  }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
