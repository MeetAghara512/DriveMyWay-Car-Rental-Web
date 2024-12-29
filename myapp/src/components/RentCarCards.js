import React from "react";
import RentCarCard from "./RentCarCard";

function RentCarCards(probs) {
      const alldata = probs.alldata;
      return (
            <>
                  <div className="flex flex-wrap justify-center gap-4 mt-[2rem]">
                        {
                              alldata.map((ele) => (

                                    <RentCarCard ele={ele} key={ele.Id}></RentCarCard>
                              ))
                        }
                       
                  </div>
            </>
      )
}

export default RentCarCards;