import { useEffect } from 'react';

const useOnMount = fun => useEffect(fun, []);

export default useOnMount;
