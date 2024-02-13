
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./subscription.css";
import * as api from "../../api/index";
import { setCurrentUser } from "../../actions/currentUser";

const Subscription = ({ setSubscription, setQuestionQuota, theme }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.currentUserReducer?.result?._id);
  const [plan, setPlan] = useState("");
  const navigate = useNavigate();

  const getQuestionQuota = (plan) => {
    switch (plan) {
      case "silver":
        return 5;
      case "gold":
        return Infinity; 
      default:
        return 1; 
    }
  };
  const handleSubscribe = async () => {
    if (!userId) {
      navigate("/Auth");
    }

    else{
      const razorpayKeyId = "rzp_test_Hv51InQ77moC4B";
      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        amount: plan === "silver" ? 10000 : plan === "gold" ? 100000 : 0,
        currency: "INR",
        name: "Stackflow",
        description: `${plan} Plan Subscription`,
        handler: async () => {
          try {
            const result = await api.createSubscription({ userId, plan });
            if (result && result.data) {
              const { subscription, questionQuota } = result.data;
              setSubscription(subscription);
              setQuestionQuota(questionQuota || getQuestionQuota(plan));
              dispatch(setCurrentUser(result.data.user));
              alert("Subscription successful!");
            } else {
              console.error(
                "Error during subscription: Subscription data is null."
              );
              alert("Subscription failed. Please try again.");
            }
          } catch (error) {
            alert("Subscription successful!");
          }
        },
      });
      razorpay.open();
    }
    
  };

  return (
    <div className={`subcards ${theme}`}>
     
        <div className="single-card">
          <h2>Choose a Subscription Plan</h2>
          <div className="subwrapper popular">
            <label className="labelinput">
              <input
                type="radio"
                name="plan"
                value="silver"
                onChange={() => setPlan("silver")}
              />
              Silver Plan (₹100/month - 5 questions/day)
            </label>
            <ul>
              <li>
                <span>Single sign-on (SSO) with SAML + Okta integration</span>
              </li>
              <li>
                <span>ChatOps integrations - Slack & Microsoft Teams</span>
              </li>
              <li>
                <span>
                  Your own private space hosted on stackoverflowteams.com
                </span>
              </li>
            </ul>
            <button className="subscribe" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        </div>
        <div className="single-card">
          <h2>Choose a Subscription Plan</h2>
          <div className="subwrapper popular">
            <label className="labelinput">
              <input
                type="radio"
                name="plan"
                value="gold"
                onChange={() => setPlan("gold")}
              />
              Gold Plan (₹1000/month - unlimited questions)
            </label>
            <ul>
              <li>
                <span>Long-form knowledge with Articles</span>
              </li>
              <li>
                <span>
                  Additional integrations — ChatOps, Jira, GitHub & Okta
                </span>
              </li>
              <li>
                <span>Group content together into Collections</span>
              </li>
            </ul>
            <button
              className="subscribe"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
     
    </div>
  );
};

export default Subscription;
