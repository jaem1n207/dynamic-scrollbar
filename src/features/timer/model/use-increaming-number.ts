export const useIncrementingNumber = (delay: number | null) => {
  const [count, setCount] = useState(0);

  const savedCallback = useRef(() => setCount((c) => c + 1));

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return count;
};
