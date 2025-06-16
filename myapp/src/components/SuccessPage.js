import { useEffect, useState, useRef } from "react";
import { useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SuccessPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const carId = query.get("carId");
  const buyerEmail = sessionStorage.getItem("Email");

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    const confirmPurchase = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/purchase`,
          {
            carId,
            buyerEmail,
          }
        );

        if (response.status === 200) {
          toast.success("Car purchase confirmed!");
          setHasConfirmed(true);
        }
      } catch (error) {
        toast.error("Failed to confirm purchase.");
        console.error(error);
      }
    };

    if (carId && buyerEmail && !hasRun.current) {
      hasRun.current = true;
      confirmPurchase();
    }
  }, [carId, buyerEmail]);

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl max-w-lg w-full p-8 text-center border border-gray-200">
        <div className="text-green-500">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4 -4M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10s-4.48 10 -10 10z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
        <p className="mt-3 text-gray-600">
          {hasConfirmed
            ? "Your car purchase has been confirmed."
            : "Confirming your purchase... Please wait."}
        </p>

        <NavLink
          to={`${window.location.origin}/`}
          className="mt-6 inline-block bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
};

export default SuccessPage;
