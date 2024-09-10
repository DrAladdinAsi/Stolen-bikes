import LottieHandler from "../feedback/LottieHandler/LottieHandler"
import "./loading.css"

type Tloading = {
    type? : string;
}

const Loading = ({type}:Tloading) => {
    if(type === "loading_data"){
  return (
    <LottieHandler type="loading" message="laoding please wait ..." />
    // <h1>we are loading...</h1>
  )
}
else{
    return(
        <h3>we are loading...</h3>
    )
}
}

export default Loading