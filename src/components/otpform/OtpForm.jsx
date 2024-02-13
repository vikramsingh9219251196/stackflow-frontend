
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./otp.css"; 
import * as api from "../../api/index";
import { setCurrentUser } from '../../actions/currentUser';

const OTPForm = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.currentUserReducer?.result?._id);
    const email = useSelector((state) => state.currentUserReducer?.result?.email);
    console.log(email,userId);
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!userId) {
            navigate("/Auth");
        }
        if (!email) {
            setError("Please enter your email.");
            return;
        }
        setLoading(true);
        setError(null);
    
        try {
            const result = await api.generateOtp({ email });
    
            if (result && result.data) {
                alert('OTP generated successfully! Check your email for the OTP.');
                if (result.data.user && result.data.user.type !== "FETCH_CURRENT_USER") {
                    dispatch(setCurrentUser(result.data.user));
                }
                setIsOtpSent(true);
            } else {
                console.error('Error during OTP generation: OTP data is null.');
                alert('OTP generation failed. Please try again.');
            }
        } catch (error) {
            setError("Failed to send OTP. Please try again.");
            console.error('Error during OTP generation:', error);
            alert('OTP generation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        setLoading(true);
        setError(null);
    
        try {
            const result = await api.verifyOtp({ userId, otp });
    
            if (result && result.data) {
                if (result.data.user && result.data.user.type !== "FETCH_CURRENT_USER") {
                    dispatch(setCurrentUser(result.data.user));
                }
                alert('OTP verification successful!');
                navigate("/chatbot");
            } else {
                console.error('Error during OTP verification: OTP data is null.');
                alert('OTP verification failed. Please try again.');
            }
        } catch (error) {
            setError("Error verifying OTP. Please try again.");
            console.error('Error during OTP verification:', error);
            alert('OTP verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='otp-form'>
          <div>
            <h2>OTP Authentication</h2>
            <div className='wrapper'>
                 <label htmlFor="email" className='labelinput'>
              <h4>Email</h4>
              <input className='input'
                type="email"
                name="email"
                id="email"
                value={email}
                disabled
              />
            </label>
            {!isOtpSent ? (
              <button  className='generate-otp'
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <>
                <label htmlFor="otp">
                  <h4>OTP</h4>
                  <input  className='input'
                    type="text"
                    name="otp"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </label>
                <button className='verify-otp'
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
             {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      );
};

export default OTPForm;
