import { useState } from "react";
import StepMessage from "./StepMessage";
import Button from "./Button";

const Steps = ({ messages }) => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleNext = () => {
    if (step < messages.length - 1) {
      setStep((s) => s + 1);
    }
  };

  return (
    <div>
      <button className='close' onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            {/* <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div> */}

            {Array.from({ length: messages.length }, (_, i) => i).map((num) => (
              <div key={num} className={step >= num ? "active" : ""}>
                {num}
              </div>
            ))}
          </div>
          {/* {messages.map((msg, index) => (
              <div className={step >= { index } ? "active" : ""}>{index}</div>
              // <li key={index}>{msg}</li>
            ))} */}
          {/* {Array.from({ length: messages.length - 1 }, (_, i) => i).map(
              (num) => (
                <div key={num} className={step >= num ? "active" : ""}>
                  {num}
                </div>
              ),
            )} */}
          <StepMessage step={step}>{messages[step]}</StepMessage>
          <div className='buttons'>
            <Button bgColor='#7950f2' textColor='#fff' onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>

            <Button bgColor='#7950f2' textColor='#fff' onClick={handleNext}>
              Next <span>👉</span>
              <span>🤓</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Steps;
