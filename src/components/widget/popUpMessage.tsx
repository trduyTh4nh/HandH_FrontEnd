import { ErrorOutline } from "@mui/icons-material";
function PopupMessage({}:any){

    return(
        <div className="overlay">
    
        <div className="popup-admin">
            <ErrorOutline style={{fontSize:80}} className="error-icon"></ErrorOutline>
          <h1 style={{ fontWeight: "bold", fontSize:55, }}>Message</h1>
          <h3 style={{fontSize:25}}>Content</h3>
    
         <div className="button-message">
         <button className="btn-message-v1">Positive</button>
         <button className="btn-message-v2">Negative</button>
         </div>
        </div>
        </div>
    );
}

export default PopupMessage;