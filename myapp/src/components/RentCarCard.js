import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GooglePayButton from '@google-pay/button-react';
import './RentcarCard.css';

function RentCarCard(props) {
      let data = props.ele;
      const [car, setCar] = useState(null);

      const ShowDetails = (id) => {
            setCar(data);
            setIsPopupOpen(true);
      };

      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const closePopup = () => {
            setIsPopupOpen(false);
      };

      const [showSuccessToast, setShowSuccessToast] = useState(false);

      const handlePurchase = () => {
            // Perform purchase logic here
            toast.success(`${car.CompanyName}  ${car.Model} purchased successfully`);
            // setShowSuccessToast(true);
            closePopup();
        };        

      // const toggleSuccessToast = () => {
      //       setShowSuccessToast(!showSuccessToast);
      // };

      return (
            <>
                  <div className="OneBoxOfSellCar rounded-md bg-gray-100">
                        <button onClick={() => ShowDetails(data.Id)}>
                              <div className="w-[300px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden">
                                    <img src={data.img} alt="not load" />
                              </div>
                              <div>
                                    <ul className="flex gap-4 text-black font-semibold text-lg leading-6 m-[5px]">
                                          <li className="AllList">{data.Model}</li> |
                                          <li className="AllList"> {data.CompanyName}</li> |
                                          <li className="AllList">{data.Id}</li>
                                    </ul>
                              </div>
                              <div>
                                    <ul className="flex gap-4 text-black font-semibold text-lg leading-6 m-[5px]">
                                          <li className="AllList">{data.Gear}</li> |
                                          <li className="AllList">{data.Fuel}</li> |
                                          <li className="AllList">Seats : {data.Seats}</li>
                                    </ul>
                              </div>
                              <div>
                                    <ul className="flex gap-4 text-black font-semibold text-lg leading-6 m-[5px]">
                                          <li className="AllList">Rating : {data.Rating}</li> |
                                          <li className="AllList">Total Trips : {data.Trips}</li>
                                    </ul>
                              </div>
                              <div className="AllList flex gap-4 text-black font-semibold text-lg leading-6 m-[5px]">
                                    ₹ {data.Price} /hr
                              </div>
                        </button>
                        {isPopupOpen && car && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-8 rounded-lg shadow-lg w-[25%]">
                                          <img src={car.img} alt="Car" className="w-32 h-32 mx-auto mb-4 rounded-lg shadow-lg" />
                                          <h2 className="text-2xl font-semibold text-center mb-2">{car.CompanyName}</h2>
                                          <h3 className="text-xl font-semibold text-center mb-2">{car.Model}</h3>
                                          <p className="text-lg font-medium text-center mb-4">{car.Id}</p>
                                          <div className="flex justify-between mb-4">
                                                <div>
                                                      <h4 className="text-lg font-semibold">Gear:</h4>
                                                      <p>{car.Gear}</p>
                                                </div>
                                                <div>
                                                      <h4 className="text-lg font-semibold">Fuel:</h4>
                                                      <p>{car.Fuel}</p>
                                                </div>
                                                <div>
                                                      <h4 className="text-lg font-semibold">Seats:</h4>
                                                      <p>{car.Seats}</p>
                                                </div>
                                          </div>
                                          <div className="flex justify-between mb-4">
                                                <div>
                                                      <h4 className="text-lg font-semibold">Rating:</h4>
                                                      <p>{car.Rating}</p>
                                                </div>
                                                <div>
                                                      <h4 className="text-lg font-semibold">Trips:</h4>
                                                      <p>{car.Trips}</p>
                                                </div>
                                          </div>
                                          <div className="flex justify-center mb-4">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={handlePurchase}>Purchase</button>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closePopup}>Close</button>
                                          </div>
                                          <div className="text-center">
                                                <GooglePayButton
                                                      environment="TEST"
                                                      buttonSizeMode="fill"
                                                      paymentRequest={{
                                                            apiVersion: 2,
                                                            apiVersionMinor: 0,
                                                            allowedPaymentMethods: [
                                                                  {
                                                                        type: 'CARD',
                                                                        parameters: {
                                                                              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                                              allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                                                        },
                                                                        tokenizationSpecification: {
                                                                              type: 'PAYMENT_GATEWAY',
                                                                              parameters: {
                                                                                    gateway: 'example',
                                                                                    gatewayMerchantId: 'exampleGatewayMerchantId',
                                                                              },
                                                                        },
                                                                  },
                                                            ],
                                                            merchantInfo: {
                                                                  merchantId: '17613812255336763067',
                                                                  merchantName: 'Demo only',
                                                            },
                                                            transactionInfo: {
                                                                  totalPriceStatus: 'FINAL',
                                                                  totalPriceLabel: 'Total',
                                                                  totalPrice: car.Price, // Assuming Price is the correct property name
                                                                  currencyCode: 'USD',
                                                                  countryCode: 'US',
                                                            },
                                                      }}
                                                      onLoadPaymentData={paymentData => {
                                                            console.log("Send order to server", paymentData.paymentMethodData);
                                                            console.log('/confirm');
                                                      }}
                                                ></GooglePayButton>
                                          </div>
                                    </div>
                              </div>
                        )}

                  </div>
                  {/* {showSuccessToast && <ToastContainer />} */}
            </>
      )
}

export default RentCarCard;
