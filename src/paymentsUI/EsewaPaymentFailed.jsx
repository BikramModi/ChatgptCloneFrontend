import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const errorMap = {
  PaymentNotComplete: "Payment was not completed.",
  MissingPaymentData: "Invalid payment response.",
  OrderNotFound: "Order not found.",
  OrderAlreadyPaid: "Order already paid.",
  VerificationFailed: "Payment verification failed.",
  UserCancelled: "Payment cancelled.",
  ServerError: "Server error during verification."
};

const EsewaPaymentFailed = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("error");
    const message = errorMap[code] || "Payment failed";

    toast.error(message);

    setTimeout(() => {
      navigate("/orders");
    }, 3000);
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>❌ Payment Failed</h1>
      <p>Redirecting...</p>
    </div>
  );
};

export default EsewaPaymentFailed;
