import { load } from "@cashfreepayments/cashfree-js";
import { useLocation } from "react-router-dom";


const PaymentPage = async () => {
    const location = useLocation();

    const orderDetails = location.state?.orderDetails || {};

    let cashfree;
    var initializeSDK = async function () {
        cashfree = await load({
            mode: "sandbox",
        });
    };
    initializeSDK();

    const doPayment = async () => {
        let checkoutOptions = {
            paymentSessionId: "session_EsCyB1BuK60Gzp_wPjJZktXuEeEqOT4CJgCzpI9_dRp4-1f4jfSsznSe7VCpvPF4O_BiVu6DW73BF0O2wV5BQQCC7WkWuY8tLP2O7a4KpjY-U566BDMmPu_lhApaymentpayment",
            redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then((result) => {
            if (result.error) {
                // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                console.log(result.error);
            }
            if (result.redirect) {
                // This will be true when the payment redirection page couldnt be opened in the same window
                // This is an exceptional case only when the page is opened inside an inAppBrowser
                // In this case the customer will be redirected to return url once payment is completed
                console.log("Payment will be redirected");
            }
            if (result.paymentDetails) {
                // This will be called whenever the payment is completed irrespective of transaction status
                console.log("Payment has been completed, Check for Payment Status");
                console.log(result.paymentDetails.paymentMessage);
            }
        });
    };

    return (
        <div className="mt-16 p-4">
            <p>Click below to open the checkout page in popup</p>
            <button type="submit" class="btn btn-primary" id="renderBtn" onClick={doPayment}>
                Pay Now
            </button>
        </div>
    );
}
export default PaymentPage;
