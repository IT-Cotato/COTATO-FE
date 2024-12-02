import React, { useState } from 'react';
import SendAuthEmail from './SendAuthEmail';
import EmailAuth from './EmailAuth';
import ResetPassword from './ResetPassword';

//
//
//

const FindPWProcess = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');

  /**
   *
   */
  const goToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      {step === 0 && (
        <SendAuthEmail email={email} setEmail={setEmail} goToNextStep={goToNextStep} />
      )}
      {step === 1 && <EmailAuth email={email} goToNextStep={goToNextStep} />}
      {step === 2 && <ResetPassword />}
    </div>
  );
};

export default FindPWProcess;
