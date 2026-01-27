import React, { useEffect } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constans";

const plans = [
  {
    id: 1,
    name: "Gold",
    price: "₹999 / month",
    description: "Best for professionals and power users",
    features: [
      "Unlimited access",
      "Priority support",
      "Advanced analytics",
      "Premium templates",
    ],
    bg: "bg-amber-500",
  },
  {
    id: 2,
    name: "Silver",
    price: "₹499 / month",
    description: "Perfect for starters and individuals",
    features: [
      "Basic access",
      "Standard support",
      "Limited analytics",
      "Community templates",
    ],
    bg: "bg-slate-500",
  },
];

const Premium = () => {
  const handleBuy = (type: string) => {
    creatPaymentOrder(type);
  };

  const openPaymentDialog = (option: any) => {

    const user=option.notes.User 
       const options = {
      key: "rzp_test_S3q9sOklyTez5D", // Enter the Key ID generated from the Dashboard
      amount: option.amount, // Amount is in currency subunits.
      currency: option.currency,
      name: "Dev Tinder", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: option.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: `${user.firstName} ${user.lastName}`, //your customer's name
        email: user.email,
        contact: "+919876543210", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
console.log(options);
  
    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  const creatPaymentOrder = async (type: string) => {
    const res = await axios.post(
      BASE_URL + "/payment/order",
      {
        type,
      },
      { withCredentials: true }
    );
    const option = res.data;
    console.log(res.data);
    openPaymentDialog(option);
  };

  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the plan that fits your needs and unlock powerful features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className={`${plan.bg} p-8 text-white`}>
                <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                <p className="opacity-90">{plan.description}</p>
                <div className="text-2xl font-semibold mt-4">{plan.price}</div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="text-green-500" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBuy(plan.name)}
                  className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
                >
                  Buy {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          30-day money-back guarantee. No questions asked.
        </div>
      </div>
    </div>
  );
};

export default Premium;
