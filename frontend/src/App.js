import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for Jobs",
  "Invest your new income",
  "cu",
];

export default function App() {
  return (
    <div>
      <Steps />
      <StepMessage step={1}>
        <p>Pass in content</p>
        <p>✌️</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read children prop</p>
        <p>😎</p>
      </StepMessage>
    </div>
  );
}

const Steps = () => {
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

const StepMessage = ({ step, children }) => {
  return (
    <div className='message'>
      <h3>Step {step}</h3>
      {children}
    </div>
  );
};

const Button = ({ textColor, bgColor, onClick, children }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
