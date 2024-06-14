import React from 'react';
import { useRouter } from 'next/router';
import Approve from '@/components/page/Approve';

function Approval() {
  const router = useRouter();
  const { id } = router.query; // Accessing the dynamic route parameter

  let code = '';
  let finalDigit = '';

  if (id && id.length === 6) {
    code = id.slice(0, 5); // Extract the first 5 digits
    finalDigit = id.slice(5); // Extract the final digit
  }

  return (
    <>
      <Approve id={code} result={finalDigit} />
    </>
  );
}

export default Approval;
