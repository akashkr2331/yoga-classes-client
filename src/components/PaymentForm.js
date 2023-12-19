import React, { useState } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios'


//2223000048410010
// 09/2026

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "14px",
			fontSmoothing: "antialiased",
			// ":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black"}
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "black"
		}
	}
}

const PaymentForm=({mob})=>{
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [pending, setpending]=useState(false)
    const [fail,setfail]=useState(false)

    console.log(mob);
    const CompletePayment = async (e) =>{
        setpending(true);
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if(!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    id
                })
                console.log(response);

                if(response.data.success){
                    console.log("Successful Payment")
                    const savepayment=await axios.post("http://localhost:4000/savepayment", {mob})
                    console.log(savepayment);
                    console.log(response);
                    setpending(false)
                    setSuccess(true)
                    setfail(false);
                    console.log(pending,success,fail)
                }

            } catch (error) {
                setfail(true);
                setpending(false)
                console.log("Error", error)
            }
        }else {
            setfail(true);
            setpending(false)
            console.log(error.message)
        }
    }

 return (
    <div className='main'>
        {!success &&
        <div className='paymentForm'>
            <div className='amount'>
                Pay 500/- Rs INR.
            </div>
        <form onSubmit={CompletePayment} className='form'>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardNumberElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardExpiryElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    <CardCvcElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            {!pending?
            <button>Pay</button>:
            <div>
    Payment pending Please Wait
</div>
}
        </form>
        {fail && 
        <div className='error'>
            Invalid card Details
            </div>
        }
        </div>
        
}


        { success && !pending &&
        <div className="payment-success">
            <h2>Payment successful</h2>
            <h3 className='Thank-you'>Thank you for your joining yoga classes</h3>
        </div>
    }
    </div>
 )
}

export default PaymentForm;
