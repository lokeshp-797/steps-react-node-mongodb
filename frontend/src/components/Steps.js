import { useEffect, useState } from "react";
import StepMessage from "./StepMessage";
import Button from "./Button";
import axios from "axios";
const url = "http://localhost:3001/api/v1/steps";

const Steps = ({ messages }) => {
  const [steps, setSteps] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [numSteps, setNumSteps] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      console.log("response is ", response);
      if (response.data && response.data.steps) {
        const stepArray = response.data.steps;
        setNumSteps(stepArray.length);
        setSteps(stepArray);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handlePrevious = () => {
    if (stepCount > 0) setStepCount((s) => s - 1);
  };

  const handleNext = () => {
    if (stepCount < numSteps - 1) {
      setStepCount((s) => s + 1);
    }
  };

  if (loading) return <h2 className='loader'>Loading menu...</h2>;

  return (
    <div>
      <button className='close' onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen &&
        (numSteps > 0 ? (
          <div className='steps'>
            <div className='numbers'>
              {/* {step.map((stp) => (
                <div key={stp._id} className={stp >= numSteps ? "active" : ""}>
                  {stp.id}
                </div>
              ))} */}

              {/* Below code for the static messages */}
              {/* {Array.from({ length: messages.length }, (_, i) => i).map(
                (num) => (
                  <div key={num} className={step >= num ? "active" : ""}>
                    {num}
                  </div>
                ),
              )} */}
              {/* <div className={step >= 1 ? "active" : ""}>1</div> */}

              {steps.map((stepItem, index) => (
                // index + 1 gives you 1, 2, 3...
                // stepItem.name would give you "ReactJS", "MongoDB", etc.
                <div
                  key={stepItem._id}
                  className={stepCount >= index ? "active" : ""}
                >
                  {index}
                </div>
              ))}
            </div>

            <StepMessage steps={stepCount}>
              {steps[stepCount].name}
              <div className='buttons'>
                <Button
                  bgColor='#e7e7e7'
                  textColor='#333'
                  onClick={() => alert(`Learn how to ${steps[stepCount - 1]}`)}
                >
                  Learn how
                </Button>
              </div>
            </StepMessage>
            <div className='buttons'>
              <Button
                bgColor='#7950f2'
                textColor='#fff'
                onClick={handlePrevious}
              >
                <span>👈</span> Previous
              </Button>

              <Button bgColor='#7950f2' textColor='#fff' onClick={handleNext}>
                Next <span>👉</span>
                <span>🤓</span>
              </Button>
            </div>
          </div>
        ) : (
          <p>Data not loaded !!</p>
        ))}
    </div>
  );
};

export default Steps;
