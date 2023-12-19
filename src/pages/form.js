
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import axios from "axios";
import "../styles/form.css"

const Index=()=>{

    const[name,setname]=useState("");
    const[mob,setmob]=useState("");
    var[dob,setdob]=useState("");
    const [slot,setslot]=useState("6AM to 7AM");
    const[join,setjoin]=useState(false);
    const [profile,setprofile]=useState(false);

    const stripePromise = loadStripe("pk_test_51OOa8gSEFwhBi62GsUPG5jxCx35Bt5RDCh04il7j1TqMeaFNrLaCVZCYtrbp3X4cUOejT7ANl5rrFv7xMSrrtEJy00yWVPT7Hz")


    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let mon = month[d.getMonth()];

const [message,setmesssage]=useState("");

// const onslotchange=(e)=>{
//     let slotid=document.getElementsByName("slot");
//         console.log(slotid);
// }

function validateForm() {
    // Check if the First Name is an Empty string or not.

    if (name.length === 0) {
      setmesssage('Name can not be empty')
      return false;
    }

    if(mob.length!==10){
        setmesssage('not valid mobile number')
      return false;
    }

    // console.log(dob.length)
    if(dob===""){
        setmesssage('enter date of birth')
      return false;
    }

    dob = new Date(dob);  

        console.log(dob);
        var month_diff = Date.now() - dob.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear() 
    var age = Math.abs(year - 1970);  
    console.log(age)

    if(age<18 && age>65){
        setmesssage("Yoga classes is only for persons of age 18 to 65")
        return false;
    }

    setjoin(true);
  }


    const handlesubmit=async(e)=>{
        e.preventDefault();
        var ele = document.getElementsByName('slot');
 
            for (let i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    setslot(ele[i].value)
            }

            console.log(name,dob,mob,slot);

        const val=validateForm();
        setprofile(true);
        if(val && join){
        // setjoin(true);
        const response=await axios.post("http://localhost:4000/userdata",{name,dob,mob,slot})
        console.log(response);
    };
        

    }
    return (
        <div>
        <div>
        {!join &&
        <div>
        <h2>Fill the form to Join Yoga classes for {mon}</h2>

        
        <form className="form">
            <div className="name">
            <label>Name</label>
            <input type="text" name="name" placeholder="Jack Johnson" required minLength={5} onChange={(e)=>setname(e.target.value)} ></input>
            </div>
            
            <div className="mob">
            <label>Mobile Number</label>
            <input type="tel" id="phone" name="mob" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="enter 10 digit number"   onChange={(e)=>setmob(e.target.value)}/>
            {/* <input name="mob" placeholder="" minLength={10} maxLength={10} onChange={(e)=>setmob(e.target.value)} ></input> */}
            </div>

           <div className="dob">
           <label>Date of Birth</label>
            {/* <input name="age" placeholder="" onChange={(e)=>setage(e.target.value)} ></input> */}
            <input type="date" id="start" name="dob" required  min="1960-01-01" max="2023-12-31" onChange={(e)=>setdob(e.target.value)} />
           </div>

           <div className="slot">
            <label>Select the preferred time slot to join</label>
            <div>
            <input type="radio" name="slot" value="6AM to 7AM" id="67" defaultChecked />
      <label htmlFor="regular">6AM to 7AM</label>
            </div>

      <div>
      <input type="radio" name="slot" value="7AM to 8AM" id="78"  />
      <label htmlFor="medium">7AM to 8AM</label>
      </div>

      <div>
      <input type="radio" name="slot" value="8AM to 9AM" id="89" />
      <label htmlFor="large">8AM to 9AM</label>
      </div>

      <div>
      <input type="radio" name="slot" value="5PM to 6PM" id="89" />
      <label htmlFor="large">5PM to 6PM</label>
      </div>

           </div>

            <button onClick={handlesubmit}>
                Proceed to payment
            </button>
        </form>
        </div>
}

        </div>

{
    profile && !join && 
    <div className="alert">
        {message}
        </div>

}

{join && profile &&
        <div>
        <Elements stripe={stripePromise}>
        <PaymentForm mob={mob} />
    </Elements>
        </div>
}
    </div>

    )
}

export default Index;
