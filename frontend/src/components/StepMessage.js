const StepMessage = ({ steps, children }) => {
  return (
    <div className='message'>
      <h3>Step {steps}</h3>
      {children}
    </div>
  );
};

export default StepMessage;
