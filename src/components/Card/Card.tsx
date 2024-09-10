
import { Bike } from "../../types/bikeInterface";
import noImageBige from "../../assets/images/noImageBike.png"
import "./card.css"

interface CardProps {
    bike: Bike;
  }

const Card = ({bike }:CardProps) => {
 
    let bikeFrameColor; 

    if(bike.frame_colors){
        bikeFrameColor = bike.frame_colors ? bike.frame_colors.join(" and ") : "";
    }
    else{
        bikeFrameColor = "";
    }



    function formatDate(timestamp: number): string {
        
        const date = new Date(timestamp * 1000);
    
        // Get month, day and year
        const options: Intl.DateTimeFormatOptions = { month: "short" };
        const month = new Intl.DateTimeFormat('en-US', options).format(date);
    
        const day = date.getDate();
        const daySuffix = getDaySuffix(day);
    
        return `${month} ${day}${daySuffix}`;
    }
    
    function getDaySuffix(day: number): string {

        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    


  return (
    <div className="card_item">
    <div className="card_item_fisrtPart">
        <img src={bike.thumb || noImageBige} alt={bike.title}  className="card_item_image"/>
        <div className="dropdown-content">
          <img src={bike.thumb || noImageBige} alt={bike.title} className="card_item_drop_down_image"/>
       <div className="desc">{bike.title}</div>
  </div>
    </div>
    <div className="card_item_secondPart">
        <span className="card_item_secondPart_title">{bike.title}</span>

        <div className="card_item_secondPart_text_items">
        <div className="card_item_secondPart_text_item">
            <span className="card_item_secondPart_text_item_label">Serial:</span>
            <span className="card_item_secondPart_text_item_info">{bike.serial}</span>
        </div>

        <div className="card_item_secondPart_text_item">
            <span className="card_item_secondPart_text_item_label label_colored_red">Stolen :</span>
            <span className="card_item_secondPart_text_item_info">{bike.date_stolen? formatDate(bike.date_stolen) : ''}</span>
        </div>
 
        <div className="card_item_secondPart_text_item">
            <span className="card_item_secondPart_text_item_label">Primary colors:</span>
            <span className="card_item_secondPart_text_item_info">{bikeFrameColor}</span>
        </div>

        <div className="card_item_secondPart_text_item">
            <span className="card_item_secondPart_text_item_label">Location :</span>
            <span className="card_item_secondPart_text_item_info">{bike.stolen_location}</span>
        </div>

        </div>
    </div>
</div>
  )
}

export default Card