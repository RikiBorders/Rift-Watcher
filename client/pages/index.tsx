import { useRouter } from 'next/router';
import React from 'react'

function Index() {
  const router = useRouter();
  
  // Redirect to the home page when the index page is accessed
  React.useEffect(() => {
    router.push('/home');
  }, []);

  return null; // This page doesn't render anything, it's just for redirection
}

export default Index;